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


module.exports = {
  getCustomerCode,
}
