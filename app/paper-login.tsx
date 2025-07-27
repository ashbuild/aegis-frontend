import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Surface, useTheme, IconButton, TextInput } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

import { PaperButton } from '@/components/ui';
import { auth } from '@/config/firebase';

export default function PaperLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const validateForm = () => {
    const emailValid = email.includes('@') && email.includes('.');
    const passwordValid = password.length >= 6;
    
    setEmailError(!emailValid);
    setPasswordError(!passwordValid);
    
    return emailValid && passwordValid;
  };

  const handleLogin = async () => {
    console.log('=== PAPER LOGIN ATTEMPT STARTED ===');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    
    if (!validateForm()) {
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
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Sign in successful!');
        console.log('User ID:', userCredential.user.uid);
        
        try {
          const token = await userCredential.user.getIdToken();
          await SecureStore.setItemAsync('authToken', token);
          console.log('🔐 Auth token stored securely');
        } catch (tokenError) {
          console.warn('⚠️ Failed to store auth token:', tokenError);
        }
        
        console.log('🚀 Navigating to main app...');
        router.replace('/(tabs)');
        return userCredential;
        
      } catch (error: any) {
        console.error(`❌ Login attempt ${retryCount + 1} failed:`, error);
        retryCount++;
        
        if (retryCount < maxRetries) {
          console.log(`⏳ Retrying in 1 second... (${retryCount}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return attemptLogin();
        } else {
          throw error;
        }
      }
    };

    try {
      await attemptLogin();
    } catch (error: any) {
      console.error('💥 All login attempts failed:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
        setEmailError(true);
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
        setEmailError(true);
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
        setPasswordError(true);
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
        setEmailError(true);
        setPasswordError(true);
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      Alert.alert('Login Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.surface} elevation={4}>
        <View style={styles.header}>
          <IconButton
            icon="shield-check"
            size={64}
            iconColor={theme.colors.primary}
          />
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
            Aegis Agent
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Sign in to your account
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (emailError) setEmailError(false);
            }}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={emailError}
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              if (passwordError) setPasswordError(false);
            }}
            mode="outlined"
            secureTextEntry
            autoComplete="password"
            error={passwordError}
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
          />

          <PaperButton
            title={loading ? 'Signing in...' : 'Sign In'}
            variant="primary"
            size="large"
            loading={loading}
            disabled={loading}
            onPress={handleLogin}
            style={styles.button}
          />

          <View style={styles.linkContainer}>
            <Link href="/register" style={styles.link}>
              <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                Don't have an account? Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  surface: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
  form: {
    gap: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  link: {
    padding: 8,
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
