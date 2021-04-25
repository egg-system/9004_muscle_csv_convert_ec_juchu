const {convertRowNum, convertDateFormat, getCustomerCode} = require('../functions')

const getTaxAmount = (value) => {
  const tax = value[0];
  const shipment = value[1];
  if (shipment === '' || shipment === '0') {
    return tax;
  }
  return Number(tax) + 181;
}

const outputsTax = {
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
      name: '行', default: 1
    },
    {name: '得意先ｺｰﾄﾞ', from: '決済方法', convert: getCustomerCode},
    {name: '得意先名１'},
    {name: '得意先名２'},
    {name: '納品先ｺｰﾄﾞ'},
    {name: '納品先名'},
    {name: '担当者ｺｰﾄﾞ'},
    {name: '部門ｺｰﾄﾞ'},
    {name: '売掛区分'},
    {name: '取引区分', default: 1},
    {name: '取引区分属性', default: 1},
    {name: '納期'},
    {name: 'オーダー№'},
    {name: '倉庫ｺｰﾄﾞ'},
    {name: '商品ｺｰﾄﾞ'},
    {name: '商品名'},
    {name: '数量'},
    {name: '数量単位'},
    {name: '単価'},
    {name: '金額', from: ['消費税合計', '送料'], convert: getTaxAmount },
    {name: '原単価'},
    {name: '原価金額'},
    {name: '粗利'},
    {name: '単価掛率'},
    {name: '課税区分', default: 9},
    {name: '消費税率％', default: 10},
    {name: '内消費税等', from: ['消費税合計', '送料'], convert: getTaxAmount },
    {name: '完納区分'},
    {name: '売上済数量'},
    {name: '売上済金額'},
    {name: '売上済内消費税額'},
    {name: '売上回数'},
    {name: '最終売上日'},
    {name: '関連売伝行数'},
    {name: '行摘要ｺｰﾄﾞ'},
    {name: '行摘要１'},
    {name: '行摘要２'},
    {name: '備考ｺｰﾄﾞ'},
    {name: '備考'},
    {name: '見積処理連番'},
    {name: '見積行'},
    {name: 'ﾃﾞｰﾀ発生区分'},
    {name: '相手発注№'},
    {name: '入力ﾊﾟﾀｰﾝ№'},
    {name: '注文番号'},
    {name: '納品先郵便番号'},
    {name: '納品先住所１'},
    {name: '納品先住所２'},
    {name: '納品先住所３'},
    {name: '納品先電話番号'},
    {name: '協力会社CD'},
    {name: '配達指定時間帯CD'},
    {name: '特記事項'},
    {name: '売上除外区分'},
    {name: 'メールアドレス'},
    {name: '携帯TEL'},
    {name: 'EC受注コード'},
    {name: 'クレカ決済状況'},
    {name: 'ｵﾘｺﾛｰﾝ申込案内'},
    {name: '出荷予定日'},
    {name: '消費税分類'},
    {name: '伝票消費税計算区分'},
    {name: '明細区分', default: 1},
    {name: '明細消費税計算区分'},
    {name: '明細消費税等'},
    {name: '申込者氏名'},
    {name: '申込者住所'},
    {name: '申込者電話番号'},
  ]
}

module.exports = {
  outputsTax,
}
