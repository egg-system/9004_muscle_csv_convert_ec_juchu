const moment = require('moment')

const convertDateFormat = (fromValue) => {
  let date = moment(fromValue, 'YYYY/MM/DD')
  if (!date.isValid()) {
    return ''
  }
  return date.format('YYYYMMDD')
}

const convertShoukyakuHouhou = (fromValue) => {
  var value = ''
  if (fromValue == 4) {
    value = 2
  } else if (fromValue == 7) {
    value = 5
  } else if (fromValue == 10) {
    value = 8
  } else if (fromValue == "") {
    value = 4
  }
  return value
}

const convertAsshukugaku = (fromValue) => {
  let asshuku = fromValue[0]
  if (asshuku == "") {
    return ""
  }
  asshuku = Number(asshuku)
  let shutoku = Number(fromValue[1])
  //圧縮額の方が取得額より大きれば設定しない
  if (shutoku < asshuku) {
    return ""
  }
  return asshuku
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

const convertShoukyakuShinkokuType = (fromValue) => {
  var value = 0
  if (fromValue == "工具、器具及び備品") {
    value = 6
  } else if (fromValue == "構築物") {
    value = 1
  } else if (fromValue == "種類未定") {
    value = 0
  }
  return value
}

const convertShinkokusakiCode = (fromValue) => {
  switch (fromValue) {
    case '13104':
      return '0001'
    case '7212':
      return '0002'
  }
  return ''
}

module.exports = {

  inputSettings: {
    json: true,

    // 列名をキーにした連想配列になる
    parses: {
      // columnValueには、対応する列の値が入る
      '固定資産コード': (columnValue) => {
        return columnValue
      },
      '名称': (columnValue) => {
        return columnValue
      },
      '資産種類コード': (columnValue) => {
        return columnValue
      },
      '数量': (columnValue) => {
        return columnValue
      },
      '取得価額': (columnValue) => {
        return columnValue
      },
      '圧縮損計上': (columnValue) => {
        return columnValue
      },
      '圧縮損計上': (columnValue) => {
        return columnValue
      },
      '期首帳簿価額': (columnValue) => {
        return columnValue
      },
      '償却累計額': (columnValue) => {
        return columnValue
      },
      '償却方法コード': (columnValue) => {
        return columnValue
      },
      '耐用年数': (columnValue) => {
        return columnValue
      },
      '償却率': (columnValue) => {
        return columnValue
      },
      '償却限度額合計': (columnValue) => {
        return columnValue
      },
      '普通償却限度額': (columnValue) => {
        return columnValue
      },
      '処分区分': (columnValue) => {
        return columnValue
      },
      '処分年月日': (columnValue) => {
        return columnValue
      },
      '取得年月日': (columnValue) => {
        return columnValue
      },
      '取得年月日': (columnValue) => {
        return columnValue
      },
      '使用開始日': (columnValue) => {
        return columnValue
      },
      '償却資産申告用資産種類': (columnValue) => {
        return columnValue
      },
      '減価償却実施額': (columnValue) => {
        return columnValue
      },
      '前期繰越超過額': (columnValue) => {
        return columnValue
      },
      '前期繰越不足額': (columnValue) => {
        return columnValue
      },
      '期首帳簿価額': (columnValue) => {
        return columnValue
      },
      '償却累計額': (columnValue) => {
        return columnValue
      },
      '改定取得価額': (columnValue) => {
        return columnValue
      },
      '調整前償却額': (columnValue) => {
        return columnValue
      }
    }
  },

  // 変換後のCSVの出力方法を設定する
  outputSettings: {
    outputs: {
      // 出力CSVのカラムを配列で設定する
      columns: [
        {
          name: '資産番号',
          from: '固定資産コード',
        },
        {
          name: '修正区分',
          default: '0',
        },
        {
          name: '資産名称',
          from: '名称',
        },
        {
          name: '資産名略称',
          from: '名称',
          convert: (fromValue) => {
            return truncateForFullChar(fromValue.replace(/[　\s]+/g, ' '), 20)
          }
        },
        {
          name: '型式',
        },
        {
          name: '索引',
        },
        {
          name: '資産区分',
          default: '0',
        },
        {
          name: '種類コード',
          from: '資産種類コード',
          convert: (fromValue) => {
            switch (fromValue) {
              case '1':
                return '000500'
              case '4':
                return '000903'
              case '12':
                return '000001'
              case '18':
                return '000005'
              case '33':
                return '000901'
              case '36':
                return '000902'
              case '39':
                return '000101'
              case '42':
                return '000110'
              default:
                return ''
            }
          }
        },
        {
          name: '構造コード',
        },
        {
          name: '細目コード',
        },
        {
          name: '部門コード',
          default: '000021',
        },
        {
          name: '普通償却費仕訳パターン',
        },
        {
          name: '特別償却費仕訳パターン',
        },
        {
          name: '設置場所コード',
        },
        {
          name: '管理者コード',
        },
        {
          name: '購入先コード',
        },
        {
          name: '財団コード',
        },
        {
          name: '売却先コード',
        },
        {
          name: '原価コード',
          default: '00000000000',
        },
        {
          name: '購入年度コード',
        },
        {
          name: '減損グループコード',
        },
        {
          name: '数量',
          from: '数量',
        },
        {
          name: '取得価額',
          from: '取得価額',
        },
        {
          name: '18年少額特例区分',
          default: '0',
        },
        {
          name: '圧縮区分',
          from: ['圧縮損計上', '取得価額'],
          convert: (fromValue) => {
            return convertAsshukugaku(fromValue) == '' ? 0 : 1
          }
        },
        {
          name: '圧縮額',
          from: ['圧縮損計上', '取得価額'],
          convert: convertAsshukugaku
        },
        {
          name: '修正後取得価額',
        },
        {
          name: '当期資本的支出累計',
        },
        {
          name: '期首帳簿価額',
          from: '期首帳簿価額',
        },
        {
          name: '期首償却累計額',
          from: '償却累計額',
        },
        {
          name: '内特別償却累計額',
        },
        {
          name: '当期償却方法',
          from: '償却方法コード',
          convert: convertShoukyakuHouhou
        },
        {
          name: '当期耐用年数',
          from: '耐用年数',
        },
        {
          name: '当期償却率',
          from: '償却率',
        },
        {
          name: '当期みなし取得区分',
          default: '0',
        },
        {
          name: '当期みなし取得価額',
          default: '0',
        },
        {
          name: '当期償却限度額',
          from: '償却限度額合計',
        },
        {
          name: '当期手入力区分',
        },
        {
          name: '当期普通償却額',
          from: '普通償却限度額',
        },
        {
          name: '当期特別償却有無区分',
        },
        {
          name: '当期特別償却率区分',
        },
        {
          name: '当期特別償却率',
        },
        {
          name: '当期特別償却分子',
        },
        {
          name: '当期特別償却分母',
        },
        {
          name: '当期特別償却額',
        },
        {
          name: '当期増加償却有無区分',
        },
        {
          name: '当期増加償却額',
        },
        {
          name: '翌期償却方法',
          from: '償却方法コード',
          convert: convertShoukyakuHouhou
        },
        {
          name: '翌期耐用年数',
          from: '耐用年数',
        },
        {
          name: '翌期償却率',
        },
        {
          name: '翌期みなし取得区分',
        },
        {
          name: '翌期みなし取得価額',
        },
        {
          name: '翌期償却限度額',
        },
        {
          name: '翌期手入力区分',
        },
        {
          name: '翌期普通償却額',
        },
        {
          name: '翌期特別償却有無区分',
        },
        {
          name: '翌期特別償却率区分',
        },
        {
          name: '翌期特別償却率',
        },
        {
          name: '翌期特別償却分子',
        },
        {
          name: '翌期特別償却分母',
        },
        {
          name: '翌期特別償却額',
        },
        {
          name: '翌期増加償却有無区分',
        },
        {
          name: '翌期増加償却額',
        },
        {
          name: '除売却区分',
          from: ['処分区分', '処分年月日'],
          convert: (fromValue) => {
            let type = fromValue[0]
            let date = fromValue[1]
            return (date != '' && type == "除却") ? '1' : ''
          }
        },
        {
          name: '除売却年月日',
          from: '処分年月日',
          convert: (fromValue) => {
            return convertDateFormat(fromValue)
          }
        },
        {
          name: '売却額',
        },
        {
          name: '当期首繰越額',
        },
        {
          name: '当期認容額',
        },
        {
          name: '当期末繰越額',
        },
        {
          name: '翌期認容額',
        },
        {
          name: '翌期末繰越額',
        },
        {
          name: '購入日',
          from: '取得年月日',
          convert: convertDateFormat
        },
        {
          name: '取得日',
          from: '取得年月日',
          convert: convertDateFormat
        },
        {
          name: '償却開始日',
          from: '使用開始日',
          convert: convertDateFormat
        },
        {
          name: '初年度償却',
          default: '0',
        },
        {
          name: '残存率',
          default: '1',
        },
        {
          name: '残存価額',
        },
        {
          name: '償却可能率',
          default: '0',
        },
        {
          name: '償却可能額',
        },
        {
          name: '翌々期償却費',
        },
        {
          name: '翌３期償却費',
        },
        {
          name: '翌４期償却費',
        },
        {
          name: '翌５期償却費',
        },
        {
          name: '償却済区分',
          default: '0',
        },
        {
          name: '償却済年',
          default: '0',
        },
        {
          name: '備考コード１',
        },
        {
          name: '備考１',
        },
        {
          name: '備考コード２',
        },
        {
          name: '備考２',
        },
        {
          name: '備考コード３',
        },
        {
          name: '備考３',
        },
        {
          name: '備考コード４',
        },
        {
          name: '備考４',
        },
        {
          name: '備考コード５',
        },
        {
          name: '備考５',
        },
        {
          name: '償却資産申告種別',
          from: '償却資産申告用資産種類',
          convert: convertShoukyakuShinkokuType
        },
        {
          name: '申告先コード',
          from: ['償却資産申告用資産種類', '申告先市町村コード'],
          convert: (fromValue) => {
            let shinkokuType = convertShoukyakuShinkokuType(fromValue[0])
            return (shinkokuType == 0) ? "" : convertShinkokusakiCode(fromValue[1])
          }
        },
        {
          name: '前年度申告時帳簿価額',
        },
        {
          name: '前年度申告時評価額',
        },
        {
          name: '取得資産の扱い',
        },
        {
          name: '償却資産申告耐用年数の指定',
        },
        {
          name: '償却資産申告耐用年数',
        },
        {
          name: '申告資産区分',
          default: '0',
        },
        {
          name: '特例課税率分母',
        },
        {
          name: '特例課税率分子',
        },
        {
          name: '適用終了年度',
        },
        {
          name: '当期償却実施額',
          from: '減価償却実施額',
        },
        {
          name: '翌期償却実施額',
        },
        {
          name: '前期繰越超過額',
          default: '0',
        },
        {
          name: '前期繰越不足額',
          default: '0',
        },
        {
          name: '会計期首帳簿価額',
          from: '期首帳簿価額',
        },
        {
          name: '会計期首償却累計額',
          from: '償却累計額',
        },
        {
          name: '当期切捨てる償却不足額',
        },
        {
          name: '翌期切捨てる償却不足額',
        },
        {
          name: '当期条項１',
        },
        {
          name: '当期条項２',
        },
        {
          name: '翌期条項１',
        },
        {
          name: '翌期条項２',
        },
        {
          name: '前期以前発生区分',
          default: '0',
        },
        {
          name: '減損損失累計額',
        },
        {
          name: '減損後帳簿価額',
        },
        {
          name: '残存手入力区分',
          default: '0',
        },
        {
          name: '減損後残存価額',
        },
        {
          name: '減損後耐用年数',
        },
        {
          name: '償却率修正区分',
          default: '0',
        },
        {
          name: '償却率',
        },
        {
          name: '計算の基礎となる金額',
        },
        {
          name: '当期月額償却費手入力区分',
          default: '0',
        },
        {
          name: '当期第１月',
        },
        {
          name: '当期第２月',
        },
        {
          name: '当期第３月',
        },
        {
          name: '当期第４月',
        },
        {
          name: '当期第５月',
        },
        {
          name: '当期第６月',
        },
        {
          name: '当期第７月',
        },
        {
          name: '当期第８月',
        },
        {
          name: '当期第９月',
        },
        {
          name: '当期第１０月',
        },
        {
          name: '当期第１１月',
        },
        {
          name: '当期第１２月',
        },
        {
          name: '翌期月額償却費手入力区分',
          default: '0',
        },
        {
          name: '翌期第１月',
        },
        {
          name: '翌期第２月',
        },
        {
          name: '翌期第３月',
        },
        {
          name: '翌期第４月',
        },
        {
          name: '翌期第５月',
        },
        {
          name: '翌期第６月',
        },
        {
          name: '翌期第７月',
        },
        {
          name: '翌期第８月',
        },
        {
          name: '翌期第９月',
        },
        {
          name: '翌期第１０月',
        },
        {
          name: '翌期第１１月',
        },
        {
          name: '翌期第１２月',
        },
        {
          name: '備忘価額区分',
        },
        {
          name: '残存償却区分',
        },
        {
          name: '改定取得価額',
          default: '0',
        },
        {
          name: '改定年月日',
        },
        {
          name: '会計期首改定取得価額',
        },
        {
          name: '会計期首改定年月日',
        },
        {
          name: '減損後改定取得価額',
        },
        {
          name: '減損後改定年月日',
        },
        {
          name: '残存償却開始年月日',
        },
        {
          name: '当期調整前償却額',
          from: '調整前償却額',
        },
        {
          name: '当期償却月数',
        },
        {
          name: '当期償却超過取崩額',
        },
        {
          name: '当期税法限度額',
        },
        {
          name: '当期減損前償却状態区分',
        },
        {
          name: '翌期調整前償却額',
        },
        {
          name: '翌期償却月数',
        },
        {
          name: '翌期償却超過取崩額',
        },
        {
          name: '翌期税法限度額',
        },
        {
          name: '翌期減損前償却状態区分',
        },
        {
          name: '翌期期首帳簿価額',
        },
        {
          name: '翌期期首償却累計額',
        },
        {
          name: '翌期償却超過額',
        },
        {
          name: '翌期会計期首帳簿価額',
        },
        {
          name: '翌期会計期首償却累計額',
        },
        {
          name: '当期改定償却限度額',
        },
        {
          name: '翌期改定償却限度額',
        },
        {
          name: '税法上取引',
        },
        {
          name: 'リース期間月数',
        },
        {
          name: '契約満了日',
        },
        {
          name: '残価保証額',
        },
        {
          name: '減損後残存月数',
        },
        {
          name: '前年申告時耐用年数',
        },
        {
          name: '申告耐用年数クリア区分',
        },
        {
          name: '申告時摘要上段',
        },
        {
          name: '申告時摘要下段',
        },
        {
          name: '資産除去債務区分',
        },
        {
          name: '対応資産番号',
        },
        {
          name: '除去費用見積額',
        },
        {
          name: '除去費用割引率',
        },
        {
          name: '除去費用償却年数',
        },
        {
          name: '利息費用仕訳パターン',
        },
        {
          name: '短縮特例適用区分',
        },
        {
          name: '短縮特例適用年月日',
        },
        {
          name: '短縮特例適用時帳簿価額',
        },
        {
          name: '定率法均等償却適用区分',
        },
        {
          name: '会計短縮特例適用時帳簿価額',
        },
        {
          name: '会計定率法均等償却適用区分',
        },
        {
          name: '翌期残存率',
        },
        {
          name: '翌期残存価額',
        },
        {
          name: '翌期償却可能率',
        },
        {
          name: '翌期償却可能額',
        },
        {
          name: '翌期備忘価額区分',
        },
        {
          name: '翌期残存償却区分',
        },
        {
          name: '償却基準区分',
        },
        {
          name: 'リース会社コード',
        },
        {
          name: '契約番号',
        }
      ]
    }
  }
}


