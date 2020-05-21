const {app} = window.require('electron').remote
const path = window.require('path')
const moment = require('moment')
// const commander = require('commander')
//   .option('-c, --config-file <type>')
//   .option('-i, --input-csv <type>')
//   .option('-o, --output-csv <type>')
// commander.parse(process.argv)
const configFilePath = __dirname + '/config.js';
const config = require(configFilePath)
const parseJson = config.inputSettings.json

const fileStream = window.require('fs')
const csvParser = require('csv')
const {juchuNumbers} = require('./global')

// 出力のロジック
const exportCsv = (data) => {
  juchuNumbers.splice(0, juchuNumbers.length)
  csvParser.stringify(data, {
    quoted: true
  }, (error, rawOutput) => {
    const fileName = 'EC受注データ_' + moment().format('YYYYMMDDHHmmss') + '.csv'
    const outputCsv = path.join(app.getPath('desktop'), fileName)
    const output = iconv.encode(rawOutput, "Shift_JIS")
    fileStream.writeFile(outputCsv, output, (error) => {
      //手抜き
      if (error) {
        alert('システムエラーが発生しました。')
        console.log(error)
      } else {
        alert(fileName + 'を出力しました。')
      }
    })
  })
}

// 設定ファイルの読み込みロジックを適用する
const convertRowCommon = (row, outputs) => {
  const parses = config.inputSettings.parses
  Object.keys(parses).forEach((key) => {
    const fromValue = row[key]
    row[key] = parses[key](fromValue)
  })

  const newRow = []
  // 列の生成
  outputs.columns.forEach(column => {
    let value = null

    if ('from' in column) {
      value = Array.isArray(column.from) ?
        column.from.map((from) => {
          return row[from]
        }) :
        row[column.from]
    }

    if ('convert' in column) {
      value = column.convert(value)
      if (value != undefined) {
      }
    }

    if (!value && 'default' in column) {
      value = column.default
      if (value != undefined && value != "") {
      }
    }
    newRow.push(value)
  })

  return newRow
}

const convertRow = (row) => {
  return convertRowCommon(row, config.outputSettings.outputs)
}

const convertRowShipment = (row) => {
  return convertRowCommon(row, config.outputSettings.outputsShipment)
}

// 入出力のロジック
const convertCsv = (error, data) => {
  const errorMessages = []
  data.forEach((row, rowIndex) => {
    config.validationSettings.forEach((setting) => {
      field = setting.field
      value = Array.isArray(field) ?
        field.map((from) => {
          return row[from]
        }) :
        row[field]
      try {
        setting.validation(value)
      } catch(e) {
        errorMessages.push(`${rowIndex + 2}行目：${e.message}`)
        console.log(e)
      }
    })
  })
  if (0 < errorMessages.length) {
    errorMessages.join('\n')
    alert(errorMessages)
    return
  }
  let newData = data.map(convertRow)
  const shipmentData = data.filter((row) => {
    const shipment = row['送料']
    return shipment !== '' && shipment !== '0'
  }).map(convertRowShipment)

  const header = config.outputSettings.outputs.columns.map(column => column.name)
  newData.unshift(header)
  newData = newData.concat(shipmentData)
  exportCsv(newData)
}

const iconv = require("iconv-lite")

const executeCsvConvert = (filePath) => {
  fileStream
    .createReadStream(filePath)
    .pipe(iconv.decodeStream('Shift_JIS'))
    .pipe(csvParser.parse({
      columns: parseJson
    }, convertCsv))
}

module.exports = {
  executeCsvConvert,
}
