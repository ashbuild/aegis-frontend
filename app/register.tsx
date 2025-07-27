import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Surface, useTheme, IconButton, TextInput, Button } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

import { auth } from '@/config/firebase';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const validateForm = () => {
    const nameValid = name.trim().length > 0;
    const emailValid = email.includes('@') && email.includes('.');
    const passwordValid = password.length >= 6;
    
    setNameError(!nameValid);
    setEmailError(!emailValid);
    setPasswordError(!passwordValid);
    
    return nameValid && emailValid && passwordValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      console.log('Starting registration...');
      console.log('Firebase auth state:', auth.currentUser);
      console.log('Firebase config:', {
        authDomain: auth.app.options.authDomain,
        apiKey: auth.app.options.apiKey?.substring(0, 5) + '...',
      });

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registration successful:', userCredential.user.uid);

      const idToken = await userCredential.user.getIdToken();
      await SecureStore.setItemAsync('authToken', idToken);
      
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = error.message;
      
      // Handle specific Firebase error codes
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please try logging in instead.';
          setEmailError(true);
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          setEmailError(true);
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Please choose a stronger password. It should be at least 6 characters long.';
          setPasswordError(true);
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
      }
      
      Alert.alert("Registration Failed", errorMessage);
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
            Create Account
          </Text>
          <Text variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            Join Aegis to start managing your finances
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={(text: string) => {
              setName(text);
              if (nameError) setNameError(false);
            }}
            mode="outlined"
            error={nameError}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />

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

          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <View style={styles.linkContainer}>
            <Link href="/login" style={styles.link}>
              <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                Already have an account? Sign In
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
  buttonContent: {
    paddingVertical: 8,
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
