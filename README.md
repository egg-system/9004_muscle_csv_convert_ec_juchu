# CSV変換ツール

## 概要
とあるECシステムからエクスポートした受注一覧のCSVファイルを元に、とある運送会社指定フォーマットの出荷指示CSVファイルを作成するツールです。<br>
Node.js-Electronで実装したWindows-GUIアプリです。https://www.electronjs.org/<br>
開発環境のOSもWindowsしか検証していません。

## 必要になると思われる開発スキル
- git
- nodejs
  - nodejsの経験がなくても、rubyのgemやPHPのcomposerなどのパッケージ管理ツールを使った開発の経験があれば、そんなに難しくないと思います。
- 変換処理を修正するだけであればElectronは分からなくても大丈夫です。

## 開発環境構築
- 開発端末にnodejsが入ってなければインストールしてください。
- `npm install`を実行してライブラリーをインストールしてください。
- `nmp start`を実行するとGUIが起動されます。

## exeファイルのコンパイル
- `nmp run build-windows`を実行すると実行ファイルがコンパイルされます。

## ファイルの役割
- 変換処理のプラグラムはconvertディレクトリ配下のjsファイルに記述しています。
  - index.js GUIから変換処理が実行された時にまず最初に呼び出されるプラグラムです。
  - config.js　
    - inputSettings 変換元CSVファイルのフォーマット定義をしています。
    - outputSettings　受注レコードの作成のための記述をしています。
  - outputsCoupon.js、outputsShipment.js、outputsTax.js　それぞれクーポンレコード、送料レコード、消費税レコードの作成のための処理を記述しています。
  - その他のjsファイルは、変換処理から呼び出される処理を役割ごとに共通化したものです。
- その上の階層のjsファイルはElectronを実行するのに必要な処理や、UIのための処理を記述しています。UIの変更がなければあまり触ることはないと思います。
