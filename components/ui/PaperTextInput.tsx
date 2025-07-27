import React from 'react';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { StyleProp, TextStyle, TextInputProps as RNTextInputProps } from 'react-native';

export type TextInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  mode?: 'flat' | 'outlined';
  error?: boolean;
  errorText?: string;
  helperText?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  left?: React.ReactNode;
  right?: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  keyboardType?: RNTextInputProps['keyboardType'];
  autoCapitalize?: RNTextInputProps['autoCapitalize'];
  autoComplete?: RNTextInputProps['autoComplete'];
  autoCorrect?: RNTextInputProps['autoCorrect'];
};

export function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  mode = 'outlined',
  error = false,
  errorText,
  helperText,
  secureTextEntry = false,
  disabled = false,
  multiline = false,
  numberOfLines,
  style,
  left,
  right,
  accessibilityLabel,
  accessibilityHint,
  keyboardType,
  autoCapitalize,
  autoComplete,
  autoCorrect,
}: TextInputProps) {
  const theme = useTheme();

  return (
    <PaperTextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      mode={mode}
      error={error}
      secureTextEntry={secureTextEntry}
      disabled={disabled}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={style}
      left={left}
      right={right}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      autoCorrect={autoCorrect}
    />
  );
}
