import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Image, Alert, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ScanScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<any>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  // Show alert for web users explaining camera limitations
  useEffect(() => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Camera Not Available on Web',
        'The camera functionality is only available on mobile devices. Please use the Expo Go app on your phone to test the camera features.',
        [
          {
            text: 'Use File Upload Instead',
            onPress: () => pickImage()
          },
          {
            text: 'OK',
            style: 'cancel'
          }
        ]
      );
    }
  }, []);

  const takePicture = async () => {
    console.log('takePicture called');
    
    if (Platform.OS === 'web') {
      Alert.alert('Feature Not Available', 'Camera is not available on web. Please use file upload instead.');
      return;
    }
    
    // Check permission first
    if (!permission?.granted) {
      console.log('Camera permission not granted');
      Alert.alert('Permission Required', 'Camera permission is required to take pictures.');
      return;
    }

    if (!cameraRef.current) {
      console.log('Camera ref not available');
      Alert.alert('Error', 'Camera not ready. Please try again.');
      return;
    }

    if (!isCameraReady) {
      console.log('Camera not ready yet');
      Alert.alert('Error', 'Camera is still initializing. Please wait a moment and try again.');
      return;
    }

    try {
      console.log('Taking picture...');
      setIsProcessing(true);
      
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });
      
      console.log('Photo result:', photo);
      
      if (photo && photo.uri) {
        console.log('Photo URI:', photo.uri);
        // Simulate API call
        setTimeout(() => {
          setScannedReceipt({
            merchant: 'Starbucks',
            total: '$12.50',
            date: new Date().toLocaleDateString(),
            items: ['Latte', 'Croissant'],
            imageUri: photo.uri
          });
          setIsProcessing(false);
        }, 2000);
      } else {
        console.log('No photo or URI received');
        setIsProcessing(false);
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    } catch (error) {
      console.log('Error taking picture:', error);
      setIsProcessing(false);
      Alert.alert('Error', `Failed to take picture: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  // Show web-friendly interface for browsers
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.webContainer}>
          <View style={styles.webCameraPlaceholder}>
            <Feather name="camera-off" size={48} color={themeColors['text-secondary']} />
            <Text style={[styles.webText, { color: themeColors['text-primary'] }]}>
              Camera not available on web
            </Text>
            <Text style={[styles.webSubtext, { color: themeColors['text-secondary'] }]}>
              Use the Expo Go app on your mobile device for camera features
            </Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Feather name="upload" size={24} color={themeColors['text-primary']} />
            <Text style={[styles.uploadButtonText, { color: themeColors['text-primary'] }]}>Upload File</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.shutterButton, styles.shutterButtonDisabled]} 
            onPress={() => Alert.alert('Not Available', 'Camera is only available on mobile devices.')}
            activeOpacity={0.7}
          >
            <View style={[styles.shutterButtonInner, { backgroundColor: '#ccc' }]} />
          </TouchableOpacity>
          
          <View style={styles.spacer}>
            <Text style={[styles.cameraStatus, { color: themeColors['text-secondary'] }]}>
              Web Mode
            </Text>
          </View>
        </View>

        {/* Modal for processing and results */}
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
                  <Text style={[styles.modalText, { color: themeColors['text-primary'] }]}>Agent is analyzing your receipt...</Text>
                </>
              ) : (
                scannedReceipt && (
                  <>
                    <Text style={[styles.modalTitle, { color: themeColors['text-primary'] }]}>Receipt Analyzed!</Text>
                    {scannedReceipt.imageUri && (
                      <Image 
                        source={{ uri: scannedReceipt.imageUri }} 
                        style={styles.scannedImage}
                        onError={(error) => console.log('Image load error:', error)}
                      />
                    )}
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

  // Mobile camera interface
  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.permissionText, { color: themeColors['text-primary'] }]}>
          Loading camera...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[styles.permissionText, { color: themeColors['text-primary'] }]}>
          No access to camera
        </Text>
        <TouchableOpacity 
          style={[styles.permissionButton, { backgroundColor: themeColors['action-primary'] }]} 
          onPress={requestPermission}
        >
          <Text style={{ color: themeColors['action-primary-text'] }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <CameraView 
        style={styles.camera} 
        ref={cameraRef} 
        facing="back"
        onCameraReady={() => {
          console.log('Camera is ready!');
          setIsCameraReady(true);
        }}
        onMountError={(error) => {
          console.log('Camera mount error:', error);
          Alert.alert('Camera Error', 'Failed to initialize camera: ' + error.message);
        }}
      >
        <View style={styles.overlay} />
      </CameraView>

      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Feather name="upload" size={24} color={themeColors['text-primary']} />
          <Text style={[styles.uploadButtonText, { color: themeColors['text-primary'] }]}>Upload File</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.shutterButton, 
            (isProcessing || !isCameraReady) && styles.shutterButtonDisabled
          ]} 
          onPress={takePicture}
          activeOpacity={0.7}
          disabled={isProcessing || !isCameraReady}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#666" />
          ) : (
            <View style={[
              styles.shutterButtonInner,
              !isCameraReady && { backgroundColor: '#ccc' }
            ]} />
          )}
        </TouchableOpacity>
        
        <View style={styles.spacer}>
          <Text style={[styles.cameraStatus, { color: themeColors['text-secondary'] }]}>
            {!isCameraReady ? 'Initializing...' : 'Ready'}
          </Text>
        </View>
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
                <Text style={[styles.modalText, { color: themeColors['text-primary'] }]}>Agent is analyzing your receipt...</Text>
              </>
            ) : (
              scannedReceipt && (
                <>
                  <Text style={[styles.modalTitle, { color: themeColors['text-primary'] }]}>Receipt Analyzed!</Text>
                  {scannedReceipt.imageUri && (
                    <Image 
                      source={{ uri: scannedReceipt.imageUri }} 
                      style={styles.scannedImage}
                      onError={(error) => console.log('Image load error:', error)}
                    />
                  )}
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
  permissionText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  permissionButton: {
    backgroundColor: '#14B8A6',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shutterButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  shutterButtonDisabled: {
    opacity: 0.5,
  },
  uploadButton: {
    alignItems: 'center',
  },
  uploadButtonText: {
    marginTop: 5,
    fontSize: 14,
  },
  spacer: {
    width: 60, // Same as upload button area
    alignItems: 'center',
  },
  cameraStatus: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
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
  // Web-specific styles
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webCameraPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(128,128,128,0.3)',
    borderStyle: 'dashed',
  },
  webText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  webSubtext: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});
