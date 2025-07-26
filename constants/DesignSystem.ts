/**
 * Aegis Design System
 * 
 * A comprehensive design system for the Aegis app featuring:
 * - Dual-theme color system (Light/Dark mode)
 * - Typography scale with Inter/Poppins fonts
 * - 8pt grid spacing system
 * - Animation presets for microinteractions
 * - Accessibility helpers for inclusive design
 */

import { Colors } from './Colors';
import { Typography } from './Typography';
import { Spacing } from './Spacing';
import { Animations } from './Animations';
import { Accessibility } from './Accessibility';

// Re-export for convenience
export { Colors, Typography, Spacing, Animations, Accessibility };

export const DesignSystem = {
  Colors,
  Typography,
  Spacing,
  Animations,
  Accessibility,
} as const;

// Theme type definition
export type ColorScheme = 'light' | 'dark';
export type ColorToken = keyof typeof Colors.light;
export type TypographyStyle = keyof typeof Typography.textStyles;
export type SpacingValue = keyof typeof Spacing;
export type AnimationPreset = keyof typeof Animations.presets;
