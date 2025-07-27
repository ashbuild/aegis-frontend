import React from 'react';
import { FAB as PaperFAB, useTheme } from 'react-native-paper';
import { ViewStyle } from 'react-native';

export type FABProps = {
  icon: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'surface' | 'secondary';
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function FAB({
  icon,
  onPress,
  size = 'medium',
  variant = 'primary',
  style,
  disabled = false,
  loading = false,
  accessibilityLabel,
  accessibilityHint,
}: FABProps) {
  const theme = useTheme();

  const getPaperVariant = () => {
    switch (variant) {
      case 'primary':
        return 'primary' as const;
      case 'surface':
        return 'surface' as const;
      case 'secondary':
        return 'secondary' as const;
      default:
        return 'primary' as const;
    }
  };

  const getPaperSize = () => {
    switch (size) {
      case 'small':
        return 'small' as const;
      case 'medium':
        return 'medium' as const;
      case 'large':
        return 'large' as const;
      default:
        return 'medium' as const;
    }
  };

  return (
    <PaperFAB
      icon={icon}
      size={getPaperSize()}
      variant={getPaperVariant()}
      onPress={onPress}
      style={style}
      disabled={disabled}
      loading={loading}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    />
  );
}
