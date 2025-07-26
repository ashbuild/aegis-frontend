import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { signInWithTestUser, getTestCredentials, validateFirebaseConfig } from '@/config/auth';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function FirebaseTestWidget() {
  const colorScheme = useColorScheme();
  const [status, setStatus] = useState<string>('Ready to test');
  const [isLoading, setIsLoading] = useState(false);

  const testFirebaseConfig = () => {
    try {
      validateFirebaseConfig();
      setStatus('✅ Firebase configuration is valid');
    } catch (error: any) {
      setStatus(`❌ Config Error: ${error.message}`);
    }
  };

  const testCredentials = () => {
    const { email } = getTestCredentials();
    setStatus(`📧 Test credentials loaded: ${email}`);
  };

  const testAuthentication = async () => {
    setIsLoading(true);
    setStatus('🔄 Testing authentication...');
    
    try {
      const userCredential = await signInWithTestUser();
      setStatus(`✅ Authentication successful! User: ${userCredential.user.email}`);
    } catch (error: any) {
      setStatus(`❌ Auth Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        🔥 Firebase Integration Test
      </ThemedText>
      
      <View style={styles.statusContainer}>
        <ThemedText style={[styles.status, { color: Colors[colorScheme ?? 'light'].text }]}>
          {status}
        </ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Test Config"
          variant="secondary"
          onPress={testFirebaseConfig}
          style={styles.button}
        />

        <Button
          title="Test Credentials"
          variant="secondary"
          onPress={testCredentials}
          style={styles.button}
        />

        <Button
          title={isLoading ? 'Testing...' : 'Test Auth'}
          variant="primary"
          onPress={testAuthentication}
          disabled={isLoading}
          style={styles.button}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  statusContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 16,
    minHeight: 50,
    justifyContent: 'center',
  },
  status: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    minWidth: 100,
  },
});
