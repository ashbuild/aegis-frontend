import React from 'react';
import { Card as PaperCard, TouchableRipple, useTheme } from 'react-native-paper';
import { ViewStyle } from 'react-native';

export type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export function Card({
  children,
  style,
  elevated = true,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}: CardProps) {
  const theme = useTheme();

  if (onPress) {
    return (
      <TouchableRipple
        onPress={onPress}
        style={style}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        <PaperCard 
          mode={elevated ? 'elevated' : 'outlined'}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <PaperCard.Content>
            {children}
          </PaperCard.Content>
        </PaperCard>
      </TouchableRipple>
    );
  }

  return (
    <PaperCard 
      mode={elevated ? 'elevated' : 'outlined'}
      style={[{ backgroundColor: theme.colors.surface }, style]}
    >
      <PaperCard.Content>
        {children}
      </PaperCard.Content>
    </PaperCard>
  );
}
