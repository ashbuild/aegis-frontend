import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Colors } from '@/constants/Colors';
import { auth } from '@/config/firebase';
import * as SecureStore from 'expo-secure-store';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Validate inputs
      if (!email || !password) {
        Alert.alert("Registration Failed", "Please enter both email and password");
        return;
      }

      if (password.length < 6) {
        Alert.alert("Registration Failed", "Password must be at least 6 characters long");
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        Alert.alert("Registration Failed", "Please enter a valid email address");
        return;
      }

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
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Please choose a stronger password. It should be at least 6 characters long.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
      }
      
      Alert.alert("Registration Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="shield" size={64} color={Colors.light.tint} />
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor={Colors.light['text-secondary']}
        value={name}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <Link href="/login" style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
