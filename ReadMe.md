# CodeScannerApp

## 概要

このアプリは、Expoのカメラ機能を使ってバーコードやQRコードをリアルタイムでスキャンし、その情報を表示するシンプルなアプリケーションです。

## 主な機能

1. カメラの権限確認とリクエスト<br>
・アプリ起動時にカメラの権限をリクエストし、ユーザーが許可を与えた場合にのみカメラを使用できます。
1. 撮像の開始と停止<br>
・撮像ボタンを押すことで、カメラが起動し、リアルタイムでバーコードやQRコードのスキャンが始まります。<br>
・撮像停止ボタンを押すことで、カメラが停止し、スキャンを終了します。
1. バーコード・QRコードの読み取り<br>
・読み取ったコードの種類（QR、バーコードなど）とデータ（コードに含まれる情報）を表示します。<br>
・新たにコードが読み取られるたびに、それが直近20個以内に既に登録されていないか確認します。
1. 表示<br>
・スキャンしている間はリアルタイムでカメラビューが画面に表示され、読み取ったコードはリスト形式で下に表示されます。
1. エラーハンドリング<br>
・カメラの権限が拒否された場合や、カメラが利用できない場合には適切なメッセージが表示されます。

## 本プログラムを作成した手順

```shell
> npx create-expo-app CodeScannerApp -t
√ Choose a template: » Blank (TypeScript)

> cd CodeScannerApp

> npx expo install expo-camera

> yarn

ChatGPTと二人三脚でコードを作成。

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
`<CameraView style={styles.camera} ref={cameraRef} />`のようです。<br>
"https://stackoverflow.com/questions/79202304/expo-camera-live-fee-in-sdk-51-aint-working-in-sdk-52-but"を参考にしてください。
