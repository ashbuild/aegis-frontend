import React from 'react';
import { View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

const hubs = [
  { name: 'KitchenIQ', icon: 'coffee' },
  { name: 'WalletWatch', icon: 'briefcase' },
  { name: 'InvestBank', icon: 'trending-up', disabled: true },
  { name: 'Eco-Track', icon: 'activity', disabled: true },
];

export default function IntelligentHubsWidget() {
  const colorScheme = useColorScheme();

  const handleHubPress = (hubName: string, disabled: boolean) => {
    if (!disabled) {
      if (hubName.toLowerCase() === 'kitcheniq') {
        router.push('/(tabs)/kitcheniq' as any);
      } else if (hubName.toLowerCase() === 'walletwatch') {
        router.push('/(tabs)/walletwatch' as any);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Intelligent Hubs</ThemedText>
      <View style={styles.hubContainer}>
        {hubs.map((hub) => (
          <TouchableOpacity
            key={hub.name}
            disabled={hub.disabled}
            onPress={() => handleHubPress(hub.name, hub.disabled || false)}
            activeOpacity={0.7}
          >
            <ThemedView
              style={[
                styles.hub,
                {
                  backgroundColor: Colors[colorScheme ?? 'light'].card,
                  shadowColor: Colors[colorScheme ?? 'light'].text,
                },
                hub.disabled && styles.disabledHub,
              ]}
            >
              <Feather name={hub.icon as any} size={28} color={hub.disabled ? Colors[colorScheme ?? 'light'].icon : Colors[colorScheme ?? 'light'].tint} />
              <ThemedText style={[styles.hubText, hub.disabled && { color: Colors[colorScheme ?? 'light'].icon }]}>
                {hub.name}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 12,
  },
  hubContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hub: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  disabledHub: {
    opacity: 0.6,
  },
  hubText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});
