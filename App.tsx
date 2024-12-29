import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';

type DetectedCode = {
  type: string;
  data: string;
};

export default function App() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedCodes, setDetectedCodes] = useState<DetectedCode[]>([]);
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = ({ type, data }: DetectedCode) => {
    // 最後の20件までチェック
    const recentCodes = detectedCodes.slice(-20); // 最後の20件を取得
    const isDuplicate = recentCodes.some((code) => code.type === type && code.data === data);

    if (!isDuplicate) {
      setDetectedCodes((prev) => [...prev, { type, data }]);
    }
  };

  const handleStartScanning = () => {
    setDetectedCodes([]); // Reset { type, data }
    setIsCameraActive(true);
  };

  const handleStopScanning = () => {
    setIsCameraActive(false);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <>
          <CameraView
            style={styles.cameraview}
            onBarcodeScanned={handleBarCodeScanned} 
            autofocus="on" 
          />
          <Button title="Stop" onPress={handleStopScanning} />
        </>
      ) : (
        <>
          <Button title="Start" onPress={handleStartScanning} />
          {detectedCodes.length === 0 ? (
            <Text>No code.</Text>
          ) : (
            <FlatList
              data={detectedCodes}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <Text>{`Type: ${item.type}, Data: ${item.data}`}</Text>
              )}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingTop: 100,
  },
  cameraview: {
    flex: 1,
    width: "100%",
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});
