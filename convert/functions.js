const moment = require('moment-timezone')
moment.tz.setDefault("Asia/Tokyo")
const {juchuNumbers} = require('./global')

const getCustomerCode = (fromValue) => {
  switch (fromValue) {
    case 'クレジットカード':
      return '99999301'
    case 'オリコショッピングローン':
      return '99999300'
    case '銀行振込':
      return '99999302'
    case 'Amazon Pay':
      return '99999303'
    case '代金引換':
      return '99999304'
  }
  return ''
}

const getKyouRyokuKaisyaCd = (fromValue) => {
  if (fromValue == '代金引換') {
    return '41'; //ヤマト便（代引き）
  }
  return '1'; //ヤマト便
}

const convertRowNum = (juchuNum) => {
  juchuNumbers.push(juchuNum)
  const countOld = juchuNumbers.filter(e => e === juchuNum).length
  return countOld
}

const convertDateFormat = (fromValue) => {
  let date = moment(fromValue, 'YYYY/MM/DD')
  if (!date.isValid()) {
    return ''
  }
  return date.format('YYYYMMDD')
}

module.exports = {
  getCustomerCode,
  getKyouRyokuKaisyaCd,
  convertRowNum,
  convertDateFormat,
}
