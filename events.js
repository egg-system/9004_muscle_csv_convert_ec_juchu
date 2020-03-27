const { BrowserWindow, dialog } = require('electron').remote;
const { executeCsvConvert } = require('./convert/index.js')

//html内の要素取得とリスナーの設定
document.querySelector("#openFile").addEventListener('click', () => {
  convert();
})

const preview = document.getElementById('preview');

//openFileボタンが押されたとき（ファイル名取得まで）
function convert() {
  const win = BrowserWindow.getFocusedWindow();
  dialog.showOpenDialog(
    win,
    {
      properties: ['openFile'],
      filters: [
        {
          name: 'Document',
          extensions: ['csv', 'txt']
        }
      ]
    }
  ).then(result => {
    executeCsvConvert(result.filePaths[0]); //複数選択の可能性もあるので配列となる。
    alert('ファイルを変換しました。')
  })
}
