import React, { useState } from "react";
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
    const recentCodes = detectedCodes.slice(-20);
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
            barcodeScannerSettings={{barcodeTypes: ["qr", "ean13"],}}
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
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Type</Text>
                <Text style={styles.tableHeaderText}>Data</Text>
              </View>
              <FlatList
                data={detectedCodes}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.type}</Text>
                    <Text style={styles.tableCell}>{item.data}</Text>
                  </View>
                )}
              />
            </View>
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
  tableContainer: {
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});
