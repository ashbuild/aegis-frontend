import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, withSpring } from 'react-native-reanimated';

import { Colors, Spacing, Accessibility } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const ScanButton = () => (
    <AnimatedView 
      style={[styles.scanButton, { backgroundColor: colors['action-primary'] }]}
      entering={FadeIn.delay(200)}
      {...Accessibility.helpers.createButtonProps(
        Accessibility.labels.scanReceipt,
        'Double tap to scan a receipt'
      )}
    >
      <Feather 
        name="plus" 
        size={Spacing.component.iconLarge} 
        color={colors['action-primary-text']} 
      />
    </AnimatedView>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors['action-primary'],
        tabBarInactiveTintColor: colors['text-secondary'],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors['background-surface'],
          borderTopColor: colors['border-subtle'],
          borderTopWidth: 1,
          height: Spacing.component.tabBarHeight,
          paddingBottom: Spacing.sm,
          paddingTop: Spacing.sm,
          shadowColor: colorScheme === 'light' ? '#000' : 'transparent',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn.delay(50)}>
              <Feather 
                name="home" 
                size={Spacing.component.tabBarIconSize} 
                color={color} 
              />
            </Animated.View>
          ),
          tabBarAccessibilityLabel: Accessibility.labels.homeTab,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn.delay(100)}>
              <Feather 
                name="list" 
                size={Spacing.component.tabBarIconSize} 
                color={color} 
              />
            </Animated.View>
          ),
          tabBarAccessibilityLabel: Accessibility.labels.historyTab,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: () => <ScanButton />,
          tabBarAccessibilityLabel: Accessibility.labels.scanTab,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn.delay(150)}>
              <Feather 
                name="message-square" 
                size={Spacing.component.tabBarIconSize} 
                color={color} 
              />
            </Animated.View>
          ),
          tabBarAccessibilityLabel: Accessibility.labels.chatTab,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Animated.View entering={FadeIn.delay(200)}>
              <Feather 
                name="user" 
                size={Spacing.component.tabBarIconSize} 
                color={color} 
              />
            </Animated.View>
          ),
          tabBarAccessibilityLabel: Accessibility.labels.profileTab,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
