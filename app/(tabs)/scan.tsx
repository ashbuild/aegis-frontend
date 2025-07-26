import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ScanScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<any>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
          setScannedReceipt({
            merchant: 'Sample Store',
            total: '$123.45',
            date: 'Jul 26, 2025',
            imageUri: photo.uri,
          });
          setIsProcessing(false);
        }, 2000);
      } catch (error) {
        console.error("Failed to take picture", error);
        Alert.alert("Error", "Failed to take picture.");
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant media library access to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsProcessing(true);
      // Simulate API call
      setTimeout(() => {
        setScannedReceipt({
          merchant: 'Uploaded Store',
          total: '$99.99',
          date: 'Jul 26, 2025',
          imageUri: result.assets[0].uri,
        });
        setIsProcessing(false);
      }, 2000);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><ActivityIndicator size="large" color={themeColors.tint} /></View>;
  }
  if (hasPermission === false) {
    return <Text style={[styles.permissionText, { color: themeColors.error }]}>No access to camera</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.overlay} />
      </Camera>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Feather name="upload" size={24} color={themeColors.primaryText} />
          <Text style={[styles.uploadButtonText, { color: themeColors.primaryText }]}>Upload File</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
          <View style={styles.shutterButtonInner} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isProcessing || scannedReceipt !== null}
        onRequestClose={() => {
          setIsProcessing(false);
          setScannedReceipt(null);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
            {isProcessing ? (
              <>
                <ActivityIndicator size="large" color={themeColors.tint} />
                <Text style={[styles.modalText, { color: themeColors.primaryText }]}>Aegnt is analyzing your receipt...</Text>
              </>
            ) : (
              scannedReceipt && (
                <>
                  <Text style={[styles.modalTitle, { color: themeColors.primaryText }]}>Receipt Analyzed!</Text>
                  <Image source={{ uri: scannedReceipt.imageUri }} style={styles.scannedImage} />
                  <Text style={[styles.modalText, { color: themeColors.primaryText }]}>Merchant: {scannedReceipt.merchant}</Text>
                  <Text style={[styles.modalText, { color: themeColors.primaryText }]}>Total: {scannedReceipt.total}</Text>
                  <Text style={[styles.modalText, { color: themeColors.primaryText }]}>Date: {scannedReceipt.date}</Text>
                  <TouchableOpacity style={[styles.googleWalletButton, { backgroundColor: themeColors.tint }]}>
                    <Text style={[styles.googleWalletButtonText, { color: themeColors.background }]}>Add to Google Wallet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setScannedReceipt(null)} style={styles.closeModalButton}>
                    <Text style={[styles.closeModalButtonText, { color: themeColors.secondaryText }]}>Close</Text>
                  </TouchableOpacity>
                </>
              )
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
    margin: 50,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  shutterButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#ccc',
  },
  shutterButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  uploadButton: {
    alignItems: 'center',
  },
  uploadButtonText: {
    marginTop: 5,
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scannedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  googleWalletButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  googleWalletButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeModalButton: {
    marginTop: 15,
  },
  closeModalButtonText: {
    fontSize: 16,
  },
  permissionText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});
