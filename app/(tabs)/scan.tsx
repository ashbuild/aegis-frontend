import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Image, Alert } from 'react-native';
import { Camera as ExpoCamera, CameraCapturedPicture } from 'expo-camera';
interface CameraInstance {
  takePictureAsync: () => Promise<CameraCapturedPicture>;
}

type CameraProps = {
  style?: any;
  ref?: React.Ref<CameraInstance>;
  type?: "back" | "front";
  children?: React.ReactNode;
};

const Camera = ExpoCamera as unknown as React.ComponentType<CameraProps>;

// Re-export the camera permissions functions
const requestCameraPermissions = ExpoCamera.requestCameraPermissionsAsync;
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ScanScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<any>(null);
  const cameraRef = useRef<CameraInstance>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissions();
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
            merchant: 'Starbucks',
            total: '$12.50',
            date: new Date().toLocaleDateString(),
            items: ['Latte', 'Croissant']
          });
          setIsProcessing(false);
        }, 2000);
      } catch (error) {
        console.log('Error taking picture:', error);
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

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={[styles.permissionText, { color: themeColors['text-primary'] }]}>
          No access to camera
        </Text>
        <TouchableOpacity 
          style={[styles.permissionButton, { backgroundColor: themeColors['action-primary'] }]} 
          onPress={() => requestCameraPermissions()}
        >
          <Text style={{ color: themeColors['action-primary-text'] }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Camera 
        style={styles.camera} 
        ref={cameraRef} 
        type="back" // Using string literal instead of CameraType enum
      >
        <View style={styles.overlay} />
      </Camera>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Feather name="upload" size={24} color={themeColors['text-primary']} />
          <Text style={[styles.uploadButtonText, { color: themeColors['text-primary'] }]}>Upload File</Text>
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
          <View style={[styles.modalContent, { backgroundColor: themeColors['background-surface'] }]}>
            {isProcessing ? (
              <>
                <ActivityIndicator size="large" color={themeColors['action-primary']} />
                <Text style={[styles.modalText, { color: themeColors['text-primary'] }]}>Aegnt is analyzing your receipt...</Text>
              </>
            ) : (
              scannedReceipt && (
                <>
                  <Text style={[styles.modalTitle, { color: themeColors['text-primary'] }]}>Receipt Analyzed!</Text>
                  <Image source={{ uri: scannedReceipt.imageUri }} style={styles.scannedImage} />
                  <Text style={[styles.modalText, { color: themeColors['text-primary'] }]}>Merchant: {scannedReceipt.merchant}</Text>
                  <Text style={[styles.modalText, { color: themeColors['text-primary'] }]}>Total: {scannedReceipt.total}</Text>
                  <Text style={[styles.modalText, { color: themeColors['text-primary'] }]}>Date: {scannedReceipt.date}</Text>
                  <TouchableOpacity style={[styles.googleWalletButton, { backgroundColor: themeColors['action-primary'] }]}>
                    <Text style={[styles.googleWalletButtonText, { color: themeColors['background-surface'] }]}>Add to Google Wallet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setScannedReceipt(null)} style={styles.closeModalButton}>
                    <Text style={[styles.closeModalButtonText, { color: themeColors['text-secondary'] }]}>Close</Text>
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
  permissionButton: {
    backgroundColor: '#14B8A6',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
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
