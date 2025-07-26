import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Colors } from '@/constants/Colors';
import { auth } from '@/config/firebase';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const handleLogin = async () => {
    console.log('=== LOGIN ATTEMPT STARTED ===');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    let retryCount = 0;
    const maxRetries = 3;

    const attemptLogin = async (): Promise<any> => {
      try {
        console.log(`Login attempt ${retryCount + 1}/${maxRetries}`);
        console.log('Firebase config check:', {
          authDomain: auth.app.options.authDomain,
          projectId: auth.app.options.projectId
        });
        
        // Check network connectivity
        try {
          const response = await fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig?key=' + auth.app.options.apiKey);
          console.log('Firebase connectivity test:', response.status === 200 ? '✅' : '❌');
        } catch (e) {
          console.log('Firebase connectivity test failed:', e);
        }
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Sign in successful!');
        console.log('User ID:', userCredential.user.uid);
        
        // Get and store the auth token
        const token = await userCredential.user.getIdToken();
        console.log('✅ Token obtained, length:', token.length);
        await SecureStore.setItemAsync('authToken', token);
        console.log('✅ Token stored successfully');
        
        // Check auth state and navigate
        console.log('Current auth user:', auth.currentUser?.uid);
        await new Promise(resolve => setTimeout(resolve, 500)); // Longer delay for state propagation
        
        if (auth.currentUser) {
          console.log('🚀 Navigating to main app...');
          router.replace('/(tabs)');
          console.log('✅ Navigation command executed');
        } else {
          throw new Error('Authentication state not updated');
        }
        
        return userCredential;
      } catch (error: any) {
        console.error(`❌ Login attempt ${retryCount + 1} failed:`, error.code);
        
        if (error.code === 'auth/network-request-failed' && retryCount < maxRetries - 1) {
          retryCount++;
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.log(`Retrying in ${delay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return attemptLogin();
        }
        
        throw error;
      }
    };

    try {
      await attemptLogin();
    } catch (error: any) {
      console.error('❌ All login attempts failed');
      console.error('Final error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = error.message;
      if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      alert('Login failed: ' + errorMessage);
    } finally {
      setLoading(false);
      console.log('=== LOGIN ATTEMPT COMPLETED ===');
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="shield" size={64} color={Colors.light.tint} />
      <Text style={styles.title}>Aegis Aegnt</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.light['text-secondary']}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.light['text-secondary']}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      <Link href="/register" style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light['text-primary'],
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: Colors.light['text-primary'],
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: Colors.light['text-secondary'],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    fontSize: 16,
    color: Colors.light.tint,
  },
});
