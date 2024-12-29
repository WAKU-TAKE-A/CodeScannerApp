# CodeScannerApp

## 概要

このアプリは、Expoのカメラ機能を使ってバーコードやQRコードをリアルタイムでスキャンし、その情報を表示するシンプルなアプリケーションです。以下のような流れで動作します：

## 主な機能

1. カメラの権限確認とリクエスト<br>
・アプリ起動時にカメラの権限をリクエストし、ユーザーが許可を与えた場合にのみカメラを使用できます。
1. 撮像の開始と停止<br>
・撮像ボタンを押すことで、カメラが起動し、リアルタイムでバーコードやQRコードのスキャンが始まります。<br>
・撮像停止ボタンを押すことで、カメラが停止し、スキャンを終了します。
1. バーコード・QRコードの読み取り<br>
・読み取ったコードの種類（QR、バーコードなど）とデータ（コードに含まれる情報）を表示します。<br>
・新たにコードが読み取られるたびに、それが直近20個以内に既に登録されていないか確認します。重複するコードは表示しません。
1. 表示<br>
・スキャンしている間はリアルタイムでカメラビューが画面に表示され、読み取ったコードはリスト形式で下に表示されます。<br>
・コードが読み取られた場合、そのデータを種類とデータとしてリストに追加します。<br>
・もし、スキャンしたコードがリストに無い場合、リストに新たに追加されます。コードが重複している場合、追加されません。
1. エラーハンドリング<br>
・カメラの権限が拒否された場合や、カメラが利用できない場合には適切なメッセージが表示されます。

## 作成手順

```shell
> npx create-expo-app CodeScannerApp -t
√ Choose a template: » Blank (TypeScript)

> cd CodeScannerApp

> npx expo install expo-camera

> yarn

> yarn start

> eas login

> eas build:configure

> eas build -p android
√ What would you like your Android application id to be? ... com.wakutakea.CodeScannerApp
...
√ Generate a new Android Keystore? ... yes
```

## 注意点

* SDK52で作成。カメラまわりのコードがずいぶん変化しています。
* 「cameraRef.current.takePictureAsync()」を使いたい場合は、<br>
<CameraView style={styles.camera} ref={cameraRef} />のようです。<br>
"https://stackoverflow.com/questions/79202304/expo-camera-live-fee-in-sdk-51-aint-working-in-sdk-52-but"を参考にしてください。