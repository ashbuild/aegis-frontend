import React from 'react';
import { Button as PaperButton, useTheme } from 'react-native-paper';
import { ViewStyle } from 'react-native';

export type ButtonProps = {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onPress,
  style,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  const theme = useTheme();

  // Map our variant to Paper's mode
  const getPaperMode = () => {
    switch (variant) {
      case 'primary':
        return 'contained' as const;
      case 'secondary':
        return 'outlined' as const;
      case 'ghost':
        return 'text' as const;
      default:
        return 'contained' as const;
    }
  };

  // Map size to style adjustments since Paper doesn't have size prop
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 4, paddingHorizontal: 12 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return {};
    }
  };

  return (
    <PaperButton
      mode={getPaperMode()}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={[getSizeStyle(), style]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      buttonColor={variant === 'primary' ? theme.colors.primary : undefined}
      textColor={variant === 'primary' ? theme.colors.onPrimary : undefined}
      compact={size === 'small'}
    >
      {title}
    </PaperButton>
  );
}
