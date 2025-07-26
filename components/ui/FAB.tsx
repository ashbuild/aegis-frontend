import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

import { Colors, Spacing, Animations, Accessibility } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type FABProps = TouchableOpacityProps & {
  icon?: keyof typeof Feather.glyphMap;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  rotateOnPress?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function FAB({
  icon = 'plus',
  size = 'medium',
  variant = 'primary',
  rotateOnPress = false,
  disabled = false,
  accessibilityLabel = 'Floating action button',
  accessibilityHint = 'Double tap to activate',
  onPress,
  style,
  ...rest
}: FABProps) {
  const colorScheme = useColorScheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const colors = Colors[colorScheme ?? 'light'];

  const handlePressIn = () => {
    scale.value = withSpring(Animations.presets.buttonPress.scale, Animations.spring.snappy);
    if (rotateOnPress) {
      rotation.value = withSpring(rotation.value + 45, Animations.spring.snappy);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Animations.spring.snappy);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const getSizeStyles = () => {
    const sizeStyles = {
      small: {
        width: 48,
        height: 48,
        borderRadius: 24,
      },
      medium: {
        width: 56,
        height: 56,
        borderRadius: 28,
      },
      large: {
        width: 64,
        height: 64,
        borderRadius: 32,
      },
    };

    return sizeStyles[size];
  };

  const getIconSize = () => {
    const iconSizes = {
      small: 20,
      medium: 24,
      large: 28,
    };

    return iconSizes[size];
  };

  const getVariantStyles = () => {
    const variantStyles = {
      primary: {
        backgroundColor: disabled ? colors['border-subtle'] : colors['action-primary'],
        shadowColor: colorScheme === 'light' ? colors['action-primary'] : 'transparent',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      },
      secondary: {
        backgroundColor: colors['background-surface'],
        borderWidth: 1,
        borderColor: disabled ? colors['border-subtle'] : colors['action-primary'],
        shadowColor: colorScheme === 'light' ? '#000' : 'transparent',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    };

    return variantStyles[variant];
  };

  const getIconColor = () => {
    if (disabled) return colors['text-secondary'];
    
    switch (variant) {
      case 'primary':
        return colors['action-primary-text'];
      case 'secondary':
        return colors['action-primary'];
      default:
        return colors['text-primary'];
    }
  };

  const accessibilityProps = Accessibility.helpers.createButtonProps(
    accessibilityLabel,
    accessibilityHint,
    disabled
  );

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.fab,
        getSizeStyles(),
        getVariantStyles(),
        animatedStyle,
        style,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      {...accessibilityProps}
      {...rest}
    >
      <Feather
        name={icon}
        size={getIconSize()}
        color={getIconColor()}
      />
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
