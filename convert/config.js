const moment = require('moment')
const { juchuNumbers } = require('./global')


const convertDateFormat = (fromValue) => {
  let date = moment(fromValue, 'YYYY/MM/DD')
  if (!date.isValid()) {
    return ''
  }
  return date.format('YYYYMMDD')
}

const convertRowNum = (juchuNum) => {
  juchuNumbers.push(juchuNum)
  const countOld = juchuNumbers.filter(e => e === juchuNum).length
  return countOld
}

const truncateForFullChar = (fromValue, size) => {
  var b = 0;
  for (var i = 0; i < fromValue.length; i++) {
    //半角カナ
    var reg = new RegExp(/^[ｦ-ﾟ]*$/);
    if (reg.test(fromValue.charAt(i))) {
      b += 1;
    } else {
      b += fromValue.charCodeAt(i) <= 255 ? 1 : 2;
    }

    if (b > size) {
      return fromValue.substr(0, i)
    }
  }
  return fromValue;
}

module.exports = {
  inputSettings: {
    json: true,
    // 列名をキーにした連想配列になる
    parses: {
      // columnValueには、対応する列の値が入る
      'レコードナンバー':  (value) => { return value },
      '受注コード':  (value) => { return value },
      '注文日時':  (value) => { return value },
      '請求合計金額':  (value) => { return value },
      '総合計金額':  (value) => { return value },
      '商品合計金額':  (value) => { return value },
      '消費税合計':  (value) => { return value },
      '包装手数料':  (value) => { return value },
      '送料':  (value) => { return value },
      '決済手数料':  (value) => { return value },
      'クール便手数料':  (value) => { return value },
      'その他手数料':  (value) => { return value },
      '決済方法':  (value) => { return value },
      '決済管理No':  (value) => { return value },
      'コンビニ区分':  (value) => { return value },
      'コンビニ支払番号':  (value) => { return value },
      '購入経路区分':  (value) => { return value },
      '通信欄':  (value) => { return value },
      'お客様へのご連絡事項':  (value) => { return value },
      'ショップメモ':  (value) => { return value },
      '処理状況区分':  (value) => { return value },
      '入金フラグ':  (value) => { return value },
      '入金確認日':  (value) => { return value },
      'メール送信日（注文確認）':  (value) => { return value },
      'メール送信回数（入金確認）':  (value) => { return value },
      'メール送信日（入金確認）':  (value) => { return value },
      '手続きフラグ':  (value) => { return value },
      '手続き日':  (value) => { return value },
      '会員ID':  (value) => { return value },
      '氏名（姓）':  (value) => { return value },
      '氏名（名）':  (value) => { return value },
      'フリガナ（姓）':  (value) => { return value },
      'フリガナ（名）':  (value) => { return value },
      'メールアドレス（メイン）':  (value) => { return value },
      'メールアドレス（サブ）':  (value) => { return value },
      'メールアドレス（モバイル）':  (value) => { return value },
      '郵便番号':  (value) => { return value },
      '地域区分':  (value) => { return value },
      '都道府県区分':  (value) => { return value },
      '住所1':  (value) => { return value },
      '住所2':  (value) => { return value },
      '住所3':  (value) => { return value },
      '電話番号（メイン）':  (value) => { return value },
      '電話番号（サブ）':  (value) => { return value },
      '携帯電話番号':  (value) => { return value },
      'FAX番号':  (value) => { return value },
      '性別区分':  (value) => { return value },
      '生年月日':  (value) => { return value },
      'ニックネーム':  (value) => { return value },
      '会社名':  (value) => { return value },
      '会社名（フリガナ）':  (value) => { return value },
      '部署名':  (value) => { return value },
      '部署名（フリガナ）':  (value) => { return value },
      '電話番号（会社）':  (value) => { return value },
      '電話番号（FAX）':  (value) => { return value },
      'メルマガ受信可否フラグ':  (value) => { return value },
      'HTMLメール受信可否フラグ':  (value) => { return value },
      'モバイルメルマガ受信可否フラグ':  (value) => { return value },
      'アンケート回答内容01':  (value) => { return value },
      'アンケート回答内容02':  (value) => { return value },
      'アンケート回答内容03':  (value) => { return value },
      'アンケート回答内容04':  (value) => { return value },
      'アンケート回答内容05':  (value) => { return value },
      'アンケート回答内容06':  (value) => { return value },
      'アンケート回答内容07':  (value) => { return value },
      'アンケート回答内容08':  (value) => { return value },
      'アンケート回答内容09':  (value) => { return value },
      'アンケート回答内容10':  (value) => { return value },
      '複数お届け先フラグ':  (value) => { return value },
      'お届け先氏名（姓）':  (value) => { return value },
      'お届け先氏名（名）':  (value) => { return value },
      'お届け先フリガナ（姓）':  (value) => { return value },
      'お届け先フリガナ（名）':  (value) => { return value },
      'お届け先郵便番号':  (value) => { return value },
      'お届け先地域区分':  (value) => { return value },
      'お届け先都道府県区分':  (value) => { return value },
      'お届け先住所１':  (value) => { return value },
      'お届け先住所２':  (value) => { return value },
      'お届け先住所３':  (value) => { return value },
      'お届け先電話番号':  (value) => { return value },
      '包装名':  (value) => { return value },
      'お届け先別商品合計':  (value) => { return value },
      'お届け先別消費税':  (value) => { return value },
      'お届け先別基本送料':  (value) => { return value },
      'お届け先別クール便手数料':  (value) => { return value },
      'お届け先別包装手数料':  (value) => { return value },
      'お届け先別決済手数料':  (value) => { return value },
      'お届け先別明細番号':  (value) => { return value },
      'お店から後ほど連絡':  (value) => { return value },
      'クール便使用フラグ':  (value) => { return value },
      '送り状番号':  (value) => { return value },
      '着予定':  (value) => { return value },
      'お届け希望日':  (value) => { return value },
      'お届け希望時間':  (value) => { return value },
      '詳細指定事項欄':  (value) => { return value },
      '発送フラグ':  (value) => { return value },
      '発送日':  (value) => { return value },
      'メール送信回数（発送通知）':  (value) => { return value },
      'メール送信日（発送通知）':  (value) => { return value },
      '商品番号':  (value) => { return value },
      '枝番号':  (value) => { return value },
      '商品名':  (value) => { return value },
      '項目選択肢':  (value) => { return value },
      'バリエーション名':  (value) => { return value },
      'オプション価格選択肢コード':  (value) => { return value },
      'オプション価格':  (value) => { return value },
      '販売単価':  (value) => { return value },
      '購入数量':  (value) => { return value },
      '消費税種類':  (value) => { return value },
      '消費税':  (value) => { return value },
      'ポイント利用の有無':  (value) => { return value },
      'ポイント利用条件':  (value) => { return value },
      'ポイント利用額':  (value) => { return value },
      'ポイントステータス':  (value) => { return value },
      '最終更新日':  (value) => { return value },
      '追加属性項目１':  (value) => { return value },
      '追加属性項目２':  (value) => { return value },
      '追加属性項目３':  (value) => { return value },
      '追加属性項目４':  (value) => { return value },
      '追加属性項目５':  (value) => { return value },
      '追加属性項目６':  (value) => { return value },
      '追加属性項目７':  (value) => { return value },
      '追加属性項目８':  (value) => { return value },
      '追加属性項目９':  (value) => { return value },
      '追加属性項目１０':  (value) => { return value },
      '追加属性項目１１':  (value) => { return value },
      '追加属性項目１２':  (value) => { return value },
      '追加属性項目１３':  (value) => { return value },
      '追加属性項目１４':  (value) => { return value },
      '追加属性項目１５':  (value) => { return value },
      '追加属性項目１６':  (value) => { return value },
      '追加属性項目１７':  (value) => { return value },
      '追加属性項目１８':  (value) => { return value },
      '追加属性項目１９':  (value) => { return value },
      '追加属性項目２０':  (value) => { return value },
      'F-REGI取引番号':  (value) => { return value },
      'F-REGI承認番号':  (value) => { return value },
      'JANコード':  (value) => { return value },
    }
  },

  // 変換後のCSVの出力方法を設定する
  outputSettings: {
    outputs: {
      // 出力CSVのカラムを配列で設定する
      columns: [
        {
          name: '受注日付',
          from: '注文日時',
          convert: convertDateFormat,
        },
        {
          name: '受注№',
          from: '受注コード',
        },
        {
          name: '行',
          from: '受注コード',
          convert: (value) => {
            return convertRowNum(value)
          }
        },
        { name: '得意先ｺｰﾄﾞ', default: '99999991'},
        { name: '得意先名１'},
        { name: '得意先名２'},
        { name: '納品先ｺｰﾄﾞ', default: '999999' },
        {
          name: '納品先名',
          from: ['お届け先氏名（姓）', 'お届け先氏名（名）'],
          convert: (value) => {
            return value[0] + value[1]
          }
        },
        { name: '担当者ｺｰﾄﾞ', default: '900000'},
        { name: '部門ｺｰﾄﾞ', default: '000003'},
        { name: '売掛区分', default: '0' },
        { name: '取引区分', default: '1' },
        { name: '取引区分属性', default: '1' },
        {
          name: '納期',
          from: 'お届け希望日',
          convert: convertDateFormat,
        },
        { name: 'オーダー№'},
        { name: '倉庫ｺｰﾄﾞ', default: '000001'},
        {
          name: '商品ｺｰﾄﾞ',
          from: 'JANコード',
          convert: (value) => {
            switch (value) {
              case '4582506230052':
                return 'MS08-ML-T0'
              case '4582506230069':
                return 'MS08-SM-T0'
              case '4582506230076':
                return 'MS08-ML-S0'
              case '4582506230083':
                return 'MS08-SM-S0'
            }
            return ''
          }
        },
        { name: '商品名', from: '商品名' },
        { name: '数量', from: '購入数量' },
        { name: '数量単位', default: '個' },
        { name: '単価', from: '販売単価' },
        {
          name: '金額',
          from: ['購入数量', '販売単価'],
          convert: (values) => {
            return Number(values[0]) * Number(values[1])
          }
        },
        { name: '原単価'},
        { name: '原価金額'},
        { name: '粗利'},
        { name: '単価掛率'},
        { name: '課税区分', default: '1'},
        { name: '消費税率％', default: '10'},
        { name: '内消費税等'},
        { name: '完納区分'},
        { name: '売上済数量'},
        { name: '売上済金額'},
        { name: '売上済内消費税額'},
        { name: '売上回数'},
        { name: '最終売上日'},
        { name: '関連売伝行数'},
        { name: '行摘要ｺｰﾄﾞ'},
        { name: '行摘要１'},
        { name: '行摘要２'},
        { name: '備考ｺｰﾄﾞ'},
        { name: '備考'},
        { name: '見積処理連番'},
        { name: '見積行'},
        { name: 'ﾃﾞｰﾀ発生区分'},
        { name: '相手発注№'},
        { name: '入力ﾊﾟﾀｰﾝ№'},
        { name: '注文番号'},
        { name: '納品先郵便番号', from: 'お届け先郵便番号'},
        {
          name: '納品先住所１',
          from: ['お届け先都道府県区分', 'お届け先住所１'],
          convert: (values) => {
            return values[0] + values[1]
          }
        },
        { name: '納品先住所２', from: 'お届け先住所２' },
        { name: '納品先住所３', from: 'お届け先住所３'},
        { name: '納品先電話番号', from: 'お届け先電話番号' },
        { name: '協力会社CD'},
        {
          name: '配達指定時間帯CD',
          from: 'お届け希望時間',
          convert: (value) => {
            switch (value) {
              case '午前中':
                return '0812'
              case '12～14時':
                return '1214'
              case '14～16時':
                return '1416'
              case '18～20時':
                return '1820'
              case '19～21時':
                return '1921'
              case '20～21時':
                return '2021'
            }
            return ''
          }
        },
        { name: '特記事項' },
        { name: '売上除外区分'},
        { name: 'メールアドレス', from: 'メールアドレス（メイン）'},
        { name: '携帯TEL', from: '携帯電話番号' },
        { name: 'EC受注コード', from: '受注コード' },
        { name: 'クレカ決済状況'},
        { name: 'ｵﾘｺﾛｰﾝ申込案内'},
        {
          name: '出荷予定日',
          from: ['お届け先都道府県区分', 'お届け希望日'],
          convert: (values) => {
            let date = moment(values[1], 'YYYY/MM/DD')
            if (!date.isValid()) {
              return moment().format('YYYYMMDD')
            }
            if (['北海道', '福岡県', '佐賀県', '大分県', '長崎県', '熊本県', '宮崎県', '鹿児島県', '沖縄県']
              .includes(values[0])) {
              return date.subtract(2, 'days').format('YYYYMMDD')
            }
            return date.subtract(1, 'days').format('YYYYMMDD')
          }
        },
        { name: '消費税分類'},
        { name: '伝票消費税計算区分'},
        { name: '明細区分'},
        { name: '明細消費税計算区分'},
        { name: '明細消費税等'},
        {
          name: '申込者氏名',
        },
        {
          name: '申込者住所',
        },
        {
          name: '申込者電話番号',
        },
      ]
    },
    //送料の出力設定
    outputsShipment: {
      // 出力CSVのカラムを配列で設定する
      columns: [
        { name: '受注日付' },
        {
          name: '受注№',
          from: '受注コード',
        },
        {
          name: '行',
          from: '受注コード',
          convert: (value) => {
            return convertRowNum(value)
          }
        },
        { name: '得意先ｺｰﾄﾞ' },
        { name: '得意先名１'},
        { name: '得意先名２'},
        { name: '納品先ｺｰﾄﾞ' },
        { name: '納品先名' },
        { name: '担当者ｺｰﾄﾞ' },
        { name: '部門ｺｰﾄﾞ' },
        { name: '売掛区分' },
        { name: '取引区分', default: '1' },
        { name: '取引区分属性', default: '1' },
        { name: '納期' },
        { name: 'オーダー№'},
        { name: '倉庫ｺｰﾄﾞ', default: '000001'},
        {
          name: '商品ｺｰﾄﾞ',
          default: 'SF-01'
        },
        { name: '商品名' },
        { name: '数量', default: '1' },
        { name: '数量単位' },
        { name: '単価', from: '送料' },
        { name: '金額', from: '送料' },
        { name: '原単価'},
        { name: '原価金額'},
        { name: '粗利'},
        { name: '単価掛率'},
        { name: '課税区分', default: '0'},
        { name: '消費税率％', default: '10'},
        { name: '内消費税等'},
        { name: '完納区分'},
        { name: '売上済数量'},
        { name: '売上済金額'},
        { name: '売上済内消費税額'},
        { name: '売上回数'},
        { name: '最終売上日'},
        { name: '関連売伝行数'},
        { name: '行摘要ｺｰﾄﾞ'},
        { name: '行摘要１'},
        { name: '行摘要２'},
        { name: '備考ｺｰﾄﾞ'},
        { name: '備考'},
        { name: '見積処理連番'},
        { name: '見積行'},
        { name: 'ﾃﾞｰﾀ発生区分'},
        { name: '相手発注№'},
        { name: '入力ﾊﾟﾀｰﾝ№'},
        { name: '注文番号'},
        { name: '納品先郵便番号'},
        { name: '納品先住所１' },
        { name: '納品先住所２' },
        { name: '納品先住所３' },
        { name: '納品先電話番号' },
        { name: '協力会社CD'},
        { name: '配達指定時間帯CD' },
        { name: '特記事項' },
        { name: '売上除外区分'},
        { name: 'メールアドレス' },
        { name: '携帯TEL' },
        { name: 'EC受注コード', from: '受注コード' },
        { name: 'クレカ決済状況'},
        { name: 'ｵﾘｺﾛｰﾝ申込案内'},
        { name: '出荷予定日' },
        { name: '消費税分類'},
        { name: '伝票消費税計算区分'},
        { name: '明細区分'},
        { name: '明細消費税計算区分'},
        { name: '明細消費税等'},
        { name: '申込者氏名' },
        { name: '申込者住所' },
        { name: '申込者電話番号' },
      ]
    }
  }
}


