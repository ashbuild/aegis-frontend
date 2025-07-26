import { View, type ViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors, Spacing, Accessibility } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  backgroundToken?: 'background-primary' | 'background-surface';
  spacing?: keyof typeof Spacing.component;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  backgroundToken = 'background-primary',
  spacing,
  accessible = false,
  accessibilityLabel,
  accessibilityRole,
  ...otherProps 
}: ThemedViewProps) {
  const colorScheme = useColorScheme();
  
  // Safe access to colors and spacing with fallbacks
  const colors = Colors[colorScheme ?? 'light'] || Colors.light;
  const defaultBackgroundColor = colors[backgroundToken] || colors['background-primary'] || colors.background || '#FFFFFF';
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, backgroundToken) || defaultBackgroundColor;

  // Apply spacing if provided with safety check
  const spacingStyle = spacing && Spacing?.component?.[spacing] 
    ? { padding: Spacing.component[spacing] } 
    : {};

  const accessibilityProps = accessible ? {
    accessible: true,
    accessibilityLabel,
    accessibilityRole: accessibilityRole as any,
  } : {};

  return (
    <View 
      style={[
        { backgroundColor }, 
        spacingStyle,
        style
      ]} 
      {...accessibilityProps}
      {...otherProps} 
    />
  );
}
