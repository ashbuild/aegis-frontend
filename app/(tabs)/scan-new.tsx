import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform, Image } from 'react-native';
import { 
  Text, 
  Button, 
  Surface, 
  useTheme, 
  IconButton, 
  Card,
  ActivityIndicator,
  Portal,
  Dialog
} from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function ScanScreen() {
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [scannedReceipt, setScannedReceipt] = useState<any>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
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

    if (!isCameraReady) {
      Alert.alert('Camera Not Ready', 'Please wait for the camera to initialize.');
      return;
    }

    try {
      setIsProcessing(true);
      console.log('Taking picture...');
      
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        console.log('Photo taken:', photo?.uri);
        
        if (photo?.uri) {
          await processImage(photo.uri);
        } else {
          console.error('No photo URI received');
          Alert.alert('Error', 'Failed to capture image. Please try again.');
        }
      } else {
        console.error('Camera ref is null');
        Alert.alert('Error', 'Camera is not available. Please try again.');
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const pickImage = async () => {
    console.log('pickImage called');
    
    try {
      setIsProcessing(true);
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      console.log('Image picker result:', result);

      if (!result.canceled && result.assets[0]) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const processImage = async (imageUri: string) => {
    console.log('Processing image:', imageUri);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock receipt data
    const mockReceipt = {
      id: Date.now().toString(),
      imageUri,
      merchantName: 'Sample Store',
      total: '$24.99',
      date: new Date().toLocaleDateString(),
      items: [
        { name: 'Coffee', price: '$4.50' },
        { name: 'Sandwich', price: '$8.99' },
        { name: 'Tax', price: '$1.20' }
      ]
    };
    
    setScannedReceipt(mockReceipt);
    setShowDialog(true);
  };

  const saveReceipt = () => {
    console.log('Saving receipt:', scannedReceipt);
    setScannedReceipt(null);
    setShowDialog(false);
    Alert.alert('Success', 'Receipt saved successfully!');
  };

  const discardReceipt = () => {
    setScannedReceipt(null);
    setShowDialog(false);
  };

  if (!permission) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Surface style={styles.centerContent} elevation={2}>
          <ActivityIndicator size="large" />
          <Text variant="bodyLarge" style={styles.centerText}>
            Loading camera...
          </Text>
        </Surface>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Surface style={styles.centerContent} elevation={2}>
          <IconButton 
            icon="camera-off" 
            size={48} 
            iconColor={theme.colors.onSurfaceVariant}
          />
          <Text variant="headlineSmall" style={styles.centerText}>
            Camera Permission Required
          </Text>
          <Text variant="bodyMedium" style={[styles.centerText, { color: theme.colors.onSurfaceVariant }]}>
            We need camera access to scan receipts
          </Text>
          <Button 
            mode="contained" 
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            Grant Permission
          </Button>
        </Surface>
      </View>
    );
  }

  const CameraControls = () => (
    <Surface style={styles.controls} elevation={4}>
      <Button
        mode="outlined"
        onPress={pickImage}
        icon="upload"
        style={styles.controlButton}
      >
        Upload
      </Button>
      
      <IconButton
        icon="camera"
        size={60}
        mode="contained"
        iconColor={theme.colors.onPrimary}
        containerColor={theme.colors.primary}
        onPress={takePicture}
        disabled={isProcessing || !isCameraReady}
      />
      
      <Button
        mode="outlined"
        onPress={() => {}}
        icon="flash-off"
        style={styles.controlButton}
      >
        Flash
      </Button>
    </Surface>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {Platform.OS !== 'web' ? (
        <CameraView 
          ref={cameraRef}
          style={styles.camera}
          facing="back"
          onCameraReady={() => setIsCameraReady(true)}
        >
          <View style={styles.overlay}>
            <Text variant="bodyLarge" style={[styles.instructions, { color: 'white' }]}>
              Position receipt within the frame
            </Text>
          </View>
        </CameraView>
      ) : (
        <Surface style={styles.webFallback} elevation={2}>
          <IconButton 
            icon="camera-off" 
            size={64} 
            iconColor={theme.colors.onSurfaceVariant}
          />
          <Text variant="headlineSmall" style={styles.centerText}>
            Camera not available on web
          </Text>
          <Text variant="bodyMedium" style={[styles.centerText, { color: theme.colors.onSurfaceVariant }]}>
            Use the upload button to select an image
          </Text>
        </Surface>
      )}

      <CameraControls />

      {isProcessing && (
        <Surface style={styles.processingOverlay} elevation={5}>
          <ActivityIndicator size="large" />
          <Text variant="bodyLarge" style={styles.centerText}>
            Processing receipt...
          </Text>
        </Surface>
      )}

      <Portal>
        <Dialog visible={showDialog} onDismiss={discardReceipt}>
          <Dialog.Title>Receipt Scanned</Dialog.Title>
          <Dialog.Content>
            {scannedReceipt && (
              <View>
                <Card mode="outlined" style={styles.receiptPreview}>
                  <Card.Content>
                    <Text variant="titleMedium">{scannedReceipt.merchantName}</Text>
                    <Text variant="bodyMedium">{scannedReceipt.date}</Text>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      {scannedReceipt.total}
                    </Text>
                  </Card.Content>
                </Card>
                <Text variant="bodyMedium" style={styles.itemsHeader}>
                  Items detected:
                </Text>
                {scannedReceipt.items.map((item: any, index: number) => (
                  <View key={index} style={styles.itemRow}>
                    <Text variant="bodyMedium">{item.name}</Text>
                    <Text variant="bodyMedium">{item.price}</Text>
                  </View>
                ))}
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={discardReceipt}>Discard</Button>
            <Button mode="contained" onPress={saveReceipt}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  instructions: {
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 8,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controlButton: {
    minWidth: 80,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 40,
    borderRadius: 16,
  },
  centerText: {
    textAlign: 'center',
    marginVertical: 8,
  },
  permissionButton: {
    marginTop: 20,
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 40,
    borderRadius: 16,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  receiptPreview: {
    marginBottom: 16,
  },
  itemsHeader: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
});
