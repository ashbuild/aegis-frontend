import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

import { Colors } from '@/constants/Colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      await SecureStore.setItemAsync('userToken', idToken);
      router.replace('/(tabs)/index');
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Feather name="shield" size={64} color={Colors.light.tint} />
      <Text style={styles.title}>Aegis Aegnt</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.light.secondaryText}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.light.secondaryText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    color: Colors.light.primaryText,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.card,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: Colors.light.primaryText,
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
