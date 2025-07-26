/**
 * Design System Theme Hook
 * Provides centralized access to all design system tokens with accessibility support
 */

import { useMemo } from 'react';
import { useColorScheme } from './useColorScheme';
import { useDynamicType, useScaledFontSize, useAccessibleFontWeight } from './useDynamicType';
import { Colors, Typography, Spacing, Animations, Accessibility } from '@/constants/DesignSystem';
import type { ColorScheme, ColorToken, TypographyStyle } from '@/constants/DesignSystem';

export interface ThemeColors {
  [key: string]: string;
}

export interface ThemeTypography {
  [key: string]: {
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    fontFamily: string;
  };
}

export interface DesignTheme {
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: typeof Spacing;
  animations: typeof Animations;
  accessibility: typeof Accessibility;
  colorScheme: ColorScheme;
  isDark: boolean;
}

export function useDesignTheme(): DesignTheme {
  const colorScheme = useColorScheme();
  const dynamicType = useDynamicType();

  const colors = useMemo(() => {
    return Colors[colorScheme ?? 'light'];
  }, [colorScheme]);

  const typography = useMemo(() => {
    const scaledTypography: ThemeTypography = {};
    
    Object.entries(Typography.textStyles).forEach(([key, style]) => {
      // Calculate scaled values directly without using hooks inside useMemo
      let scaledSize = style.fontSize * (dynamicType.fontScale || 1);
      
      // Additional scaling for large text users
      if (dynamicType.isLargeTextEnabled) {
        scaledSize *= 1.2;
      }
      
      // Ensure minimum readable size
      scaledSize = Math.max(scaledSize, 12);
      
      // Adjust font weight for bold text preference
      let adjustedFontWeight = style.fontWeight;
      if (dynamicType.isBoldTextEnabled) {
        switch (style.fontWeight) {
          case '400':
            adjustedFontWeight = '600';
            break;
          case '500':
            adjustedFontWeight = '700';
            break;
          case '600':
            adjustedFontWeight = '700';
            break;
          default:
            adjustedFontWeight = style.fontWeight;
        }
      }
      
      scaledTypography[key] = {
        ...style,
        fontSize: scaledSize,
        fontWeight: adjustedFontWeight,
      };
    });
    
    return scaledTypography;
  }, [dynamicType]);

  const isDark = colorScheme === 'dark';

  return useMemo(() => ({
    colors,
    typography,
    spacing: Spacing,
    animations: Animations,
    accessibility: Accessibility,
    colorScheme: colorScheme ?? 'light',
    isDark,
  }), [colors, typography, colorScheme, isDark]);
}

/**
 * Hook for getting a specific color token
 */
export function useThemeColor(colorToken: ColorToken): string {
  const { colors } = useDesignTheme();
  return colors[colorToken] || colors['text-primary'];
}

/**
 * Hook for getting scaled typography styles
 */
export function useThemeTypography(styleKey: TypographyStyle) {
  const { typography } = useDesignTheme();
  return typography[styleKey] || typography.body;
}

/**
 * Hook for creating responsive spacing based on screen size
 */
export function useResponsiveSpacing() {
  const { spacing } = useDesignTheme();
  
  // Could be extended with screen size detection for tablet/desktop layouts
  return spacing;
}

/**
 * Hook for getting animation configurations
 */
export function useThemeAnimations() {
  const { animations } = useDesignTheme();
  return animations;
}
