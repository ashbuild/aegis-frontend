import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

export default function HomeScreen() {
  console.log('HomeScreen rendering...', Platform.OS);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native!</Text>
      <Text style={styles.subtitle}>Platform: {Platform.OS}</Text>
      <Text style={styles.text}>
        If you can see this, the app is working correctly on {Platform.OS}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
