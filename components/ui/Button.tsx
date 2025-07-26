import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

import { ThemedText } from '../ThemedText';
import { Colors, Spacing, Typography, Animations, Accessibility } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);

  const colors = Colors[colorScheme ?? 'light'];

  const handlePressIn = () => {
    scale.value = withSpring(Animations.presets.buttonPress.scale, Animations.spring.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Animations.spring.snappy);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: Spacing.component.borderRadiusMedium,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
    };

    const sizeStyles = {
      small: {
        height: Spacing.component.buttonSmall,
        paddingHorizontal: Spacing.md,
      },
      medium: {
        height: Spacing.component.buttonMedium,
        paddingHorizontal: Spacing.lg,
      },
      large: {
        height: Spacing.component.buttonLarge,
        paddingHorizontal: Spacing.xl,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? colors['border-subtle'] : colors['action-primary'],
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? colors['border-subtle'] : colors['action-primary'],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextColor = () => {
    if (disabled) return colors['text-secondary'];
    
    switch (variant) {
      case 'primary':
        return colors['action-primary-text'];
      case 'secondary':
      case 'ghost':
        return colors['action-primary'];
      default:
        return colors['text-primary'];
    }
  };

  const getTextStyle = () => {
    const baseStyle = Typography.textStyles.body;
    
    const sizeStyles = {
      small: { fontSize: Typography.fontSize.bodySmall },
      medium: { fontSize: Typography.fontSize.body },
      large: { fontSize: Typography.fontSize.body },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      color: getTextColor(),
      fontWeight: Typography.fontWeight.semiBold,
    };
  };

  const accessibilityProps = Accessibility.helpers.createButtonProps(
    accessibilityLabel || title,
    accessibilityHint,
    disabled || loading
  );

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, getButtonStyle(), style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      {...accessibilityProps}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={getTextColor()} 
          accessibilityLabel="Loading"
        />
      ) : (
        <ThemedText 
          style={getTextStyle()}
          accessible={false} // Parent handles accessibility
        >
          {title}
        </ThemedText>
      )}
    </AnimatedTouchableOpacity>
  );
}
