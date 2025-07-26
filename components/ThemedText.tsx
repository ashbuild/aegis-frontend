import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Typography, Colors, Accessibility, type TypographyStyle } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TypographyStyle | 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  colorToken?: 'text-primary' | 'text-secondary' | 'action-primary' | 'semantic-success' | 'semantic-warning' | 'semantic-error';
  accessible?: boolean;
  accessibilityLabel?: string;
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  colorToken = 'text-primary',
  accessible = true,
  accessibilityLabel,
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();
  
  // Safe access to colors with fallbacks
  const colors = Colors[colorScheme ?? 'light'] || Colors.light;
  const defaultColor = colors[colorToken] || colors['text-primary'] || colors.text || '#000000';
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorToken) || defaultColor;

  // Get typography style from design system
  const getTypographyStyle = () => {
    // Safe access to typography styles
    if (Typography?.textStyles?.[type as TypographyStyle]) {
      return Typography.textStyles[type as TypographyStyle];
    }
    
    // Legacy support for existing types
    switch (type) {
      case 'title':
        return Typography?.textStyles?.h1 || Typography.textStyles.body;
      case 'defaultSemiBold':
        return { 
          ...(Typography?.textStyles?.body || {}), 
          fontWeight: Typography?.fontWeight?.semiBold || '600' 
        };
      case 'subtitle':
        return Typography?.textStyles?.h3 || Typography.textStyles.body;
      case 'link':
        return { 
          ...(Typography?.textStyles?.body || {}), 
          color: colors['action-primary'] || '#0a7ea4' 
        };
      default:
        return Typography?.textStyles?.body || {
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
          fontWeight: '400' as const,
          lineHeight: 24,
        };
    }
  };

  const typographyStyle = getTypographyStyle();

  return (
    <Text
      style={[
        { color },
        typographyStyle,
        style,
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={Accessibility.roles.text}
      {...rest}
    />
  );
}

// Legacy styles for backward compatibility
const styles = StyleSheet.create({
  default: Typography.textStyles.body,
  defaultSemiBold: {
    ...Typography.textStyles.body,
    fontWeight: Typography.fontWeight.semiBold,
  },
  title: Typography.textStyles.h1,
  subtitle: Typography.textStyles.h3,
  link: {
    ...Typography.textStyles.body,
    color: '#0a7ea4', // Will be overridden by theme
  },
});
