const { app } = window.require('electron').remote;
const path = window.require('path');
const moment = require('moment');
// const commander = require('commander')
//   .option('-c, --config-file <type>')
//   .option('-i, --input-csv <type>')
//   .option('-o, --output-csv <type>')
// commander.parse(process.argv)
const configFilePath = __dirname + '/config.js';
const config = require(configFilePath);
const parseJson = config.inputSettings.json;

const fileStream = window.require('fs');
const csvParser = require('csv');
const { juchuNumbers } = require('./global');

// クーポンが出力された受注コードを格納
let couponOutputlist = [];

// 出力のロジック
const exportCsv = (data) => {
  juchuNumbers.splice(0, juchuNumbers.length);
  csvParser.stringify(
    data,
    {
      quoted: true,
    },
    (error, rawOutput) => {
      const fileName =
        'EC受注データ_' + moment().format('YYYYMMDDHHmmss') + '.csv';
      const outputCsv = path.join(app.getPath('downloads'), fileName);
      const output = iconv.encode(rawOutput, 'Shift_JIS');
      fileStream.writeFile(outputCsv, output, (error) => {
        //手抜き
        if (error) {
          alert('システムエラーが発生しました。');
          console.log(error);
        } else {
          alert(fileName + 'を出力しました。');
        }
      });
    }
  );
};

// 設定ファイルの読み込みロジックを適用する
const convertRowCommon = (row, outputs) => {
  const parses = config.inputSettings.parses;
  Object.keys(parses).forEach((key) => {
    const fromValue = row[key];
    row[key] = parses[key](fromValue);
  });

  const newRow = [];
  // 列の生成
  outputs.columns.forEach((column) => {
    let value = null;

    if ('from' in column) {
      value = Array.isArray(column.from)
        ? column.from.map((from) => {
            return row[from];
          })
        : row[column.from];
    }

    if ('convert' in column) {
      value = column.convert(value);
      if (value != undefined) {
      }
    }

    if (!value && 'default' in column) {
      value = column.default;
      if (value != undefined && value != '') {
      }
    }
    newRow.push(value);
  });

  return newRow;
};

const convertRow = (row) => {
  return convertRowCommon(row, config.outputSettings.outputs);
};

const convertRowShipment = (row) => {
  return convertRowCommon(row, config.outputSettings.outputsShipment);
};

const convertRowCoupon = (row) => {
  return convertRowCommon(row, config.outputSettings.outputsCoupon);
};

const convertRowTax = (row) => {
  return convertRowCommon(row, config.outputSettings.outputsTax);
};
// 入出力のロジック
const convertCsv = (error, data) => {
  console.log('data', data);
  const errorMessages = [];
  // お届け先情報についてバリデーション
  data.forEach((row, rowIndex) => {
    config.validationSettings.forEach((setting) => {
      field = setting.field;
      value = Array.isArray(field)
        ? field.map((from) => {
            return row[from];
          })
        : row[field];
      try {
        setting.validation(value, field);
      } catch (e) {
        errorMessages.push(`${rowIndex + 2}行目：${e.message}`);
        console.log(e);
      }
    });
  });
  // エラーメッセージがある場合は表示して終了
  if (0 < errorMessages.length) {
    alert(errorMessages.join('\n'));
    return;
  }
  // データの変換
  let newData = data.map(convertRow);

  /**
   * 送料のデータを出力
   * 送料カラムが空でない、かつ0でない、かつ受注コードが重複していない行の場合に追加する。
   */
  const juchuNumbersOfShipment = [];
  const shipmentData = data
    .filter((row) => {
      const shipment = row['送料'];
      if (
        shipment !== '' &&
        shipment !== '0' &&
        !juchuNumbersOfShipment.includes(row['受注コード'])
      ) {
        juchuNumbersOfShipment.push(row['受注コード']);
        return true;
      }
      return false;
    })
    .map(convertRowShipment);

  /**
   * クーポンのデータを出力
   * 割引合計金額（商品）に値が入っている、かつ受注コードが重複していない行の場合に追加する。
   */
  const couponData = data
    .filter((row) => {
      if (
        typeof row['割引合計金額（商品）'] === 'undefined' ||
        row['割引合計金額（商品）'] == '' ||
        isNaN(row['割引合計金額（商品）']) ||
        row['割引合計金額（商品）'] === '0'
      ) {
        return false;
      }

      // クーポン出力リストを照合
      // 受注コードが存在する場合
      if (couponOutputlist.includes(row['受注コード'])) {
        // クーポンデータを出力しない
        return false;
      }
      // 受注コードが存在しなかった場合
      // クーポン出力リストに受注コードを追加
      couponOutputlist.push(row['受注コード']);

      return true;
    })
    .map(convertRowCoupon);

  /**
   * 消費税のデータを出力
   * 受注コードが重複していない行の場合に追加する。
   */
  const taxData = data
    .filter((row, i, self) => {
      return (
        self.findIndex((_row) => {
          return _row['受注コード'] === row['受注コード'];
        }) === i
      );
    })
    .map(convertRowTax);

  const header = config.outputSettings.outputs.columns.map(
    (column) => column.name
  );
  // 各データを結合
  newData = newData.concat(shipmentData);
  newData = newData.concat(couponData);
  newData = newData.concat(taxData);

  // ソートを行う
  newData.sort((row1, row2) => {
    // 受注コードでソート
    if (row1[header.indexOf('受注№')] !== row2[header.indexOf('受注№')]) {
      return (
        Number(row1[header.indexOf('受注№')]) -
        Number(row2[header.indexOf('受注№')])
      );
    }
    // 同じ受注コードであれば課税区分が9の行（消費税の行）が一番後ろにソートされる
    if (Number(row1[header.indexOf('課税区分')]) == 9) {
      return 1;
    }
    if (Number(row2[header.indexOf('課税区分')]) == 9) {
      return -1;
    }

    // その他は行の値でソート
    return row1[header.indexOf('行')] < row2[header.indexOf('行')];
  });

  // ヘッダーを追加
  newData.unshift(header);
  exportCsv(newData);
};

const iconv = require('iconv-lite');

const executeCsvConvert = (filePath) => {
  // クーポン出力リストを初期化
  couponOutputlist = [];

  console.log('filePath', filePath);

  fileStream
    .createReadStream(filePath)
    .pipe(iconv.decodeStream('Shift_JIS'))
    .pipe(
      csvParser.parse(
        {
          columns: parseJson,
        },
        convertCsv
      )
    );
};

module.exports = {
  executeCsvConvert,
};
