import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.light.card,
          borderTopColor: Colors.light.card,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.scanButton}>
              <Feather name="plus" size={32} color={Colors.light.background} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <Feather name="message-square" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: Colors.light.tint,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
});
