import React from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { ThemedView } from '../ThemedView';
import { Colors, Spacing, Accessibility } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

export type CardProps = ViewProps & {
  elevation?: 'none' | 'low' | 'medium' | 'high';
  glassmorphism?: boolean;
  animateOnMount?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
};

export function Card({
  children,
  elevation = 'low',
  glassmorphism = false,
  animateOnMount = false,
  style,
  accessibilityLabel,
  accessibilityRole,
  ...rest
}: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getElevationStyle = () => {
    const elevationStyles = {
      none: {},
      low: {
        shadowColor: colorScheme === 'light' ? '#000' : 'transparent',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      medium: {
        shadowColor: colorScheme === 'light' ? '#000' : 'transparent',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      high: {
        shadowColor: colorScheme === 'light' ? '#000' : 'transparent',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      },
    };

    return elevationStyles[elevation];
  };

  const getGlassmorphismStyle = () => {
    if (!glassmorphism) return {};
    
    return {
      backgroundColor: colorScheme === 'light' 
        ? 'rgba(255, 255, 255, 0.8)' 
        : 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(10px)',
    };
  };

  const cardStyle = [
    styles.card,
    getElevationStyle(),
    glassmorphism ? getGlassmorphismStyle() : { backgroundColor: colors['background-surface'] },
    style,
  ];

  const accessibilityProps = accessibilityLabel ? {
    accessible: true,
    accessibilityLabel,
    accessibilityRole: accessibilityRole as any,
  } : {};

  const CardComponent = animateOnMount ? Animated.View : ThemedView;
  const animationProps = animateOnMount ? { entering: FadeInUp.delay(100).springify() } : {};

  return (
    <CardComponent
      style={cardStyle}
      backgroundToken="background-surface"
      {...accessibilityProps}
      {...animationProps}
      {...rest}
    >
      {children}
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.component.cardBorderRadius,
    padding: Spacing.component.cardPadding,
    margin: Spacing.component.cardMargin,
  },
});
