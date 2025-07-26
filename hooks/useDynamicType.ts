/**
 * Dynamic Type Hook
 * Provides accessibility support for users with different font size preferences
 * Supports iOS Dynamic Type and Android font scale
 */

import { useState, useEffect } from 'react';
import { Platform, AccessibilityInfo } from 'react-native';

export interface DynamicTypeSettings {
  fontScale: number;
  isLargeTextEnabled: boolean;
  isBoldTextEnabled: boolean;
}

export function useDynamicType(): DynamicTypeSettings {
  const [settings, setSettings] = useState<DynamicTypeSettings>({
    fontScale: 1,
    isLargeTextEnabled: false,
    isBoldTextEnabled: false,
  });

  useEffect(() => {
    const updateSettings = async () => {
      try {
        if (Platform.OS === 'ios') {
          // iOS Dynamic Type support
          const isLargeTextEnabled = await AccessibilityInfo.isScreenReaderEnabled();
          const isBoldTextEnabled = await AccessibilityInfo.isBoldTextEnabled?.() || false;
          
          setSettings(prev => ({
            ...prev,
            isLargeTextEnabled,
            isBoldTextEnabled,
          }));
        } else if (Platform.OS === 'android') {
          // Android accessibility support
          const isLargeTextEnabled = await AccessibilityInfo.isScreenReaderEnabled();
          
          setSettings(prev => ({
            ...prev,
            isLargeTextEnabled,
          }));
        }
      } catch (error) {
        console.warn('Failed to fetch accessibility settings:', error);
        // Fallback to default settings
        setSettings({
          fontScale: 1,
          isLargeTextEnabled: false,
          isBoldTextEnabled: false,
        });
      }
    };

    updateSettings();

    // Listen for accessibility changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      updateSettings
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return settings;
}

/**
 * Calculates scaled font size based on user's accessibility preferences
 */
export function useScaledFontSize(baseFontSize: number): number {
  const { fontScale, isLargeTextEnabled } = useDynamicType();
  
  let scaledSize = baseFontSize * fontScale;
  
  // Additional scaling for large text users
  if (isLargeTextEnabled) {
    scaledSize *= 1.2;
  }
  
  // Ensure minimum readable size
  return Math.max(scaledSize, 12);
}

/**
 * Returns font weight adjusted for bold text preference
 */
export function useAccessibleFontWeight(baseFontWeight: string): string {
  const { isBoldTextEnabled } = useDynamicType();
  
  if (isBoldTextEnabled && Platform.OS === 'ios') {
    // Increase font weight for bold text users
    switch (baseFontWeight) {
      case '400':
      case 'normal':
        return '600';
      case '500':
        return '700';
      case '600':
        return '700';
      default:
        return baseFontWeight;
    }
  }
  
  return baseFontWeight;
}
