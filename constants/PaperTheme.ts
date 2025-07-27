/**
 * React Native Paper Theme Configuration
 * Integrates with our existing Design System
 */

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { Colors } from './Colors';

export const paperLightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Primary colors
    primary: Colors.light['action-primary'],
    onPrimary: Colors.light['action-primary-text'],
    primaryContainer: Colors.light['action-primary'] + '1A', // 10% opacity
    onPrimaryContainer: Colors.light['action-primary'],
    
    // Secondary colors
    secondary: Colors.light['text-secondary'],
    onSecondary: Colors.light['background-surface'],
    secondaryContainer: Colors.light['text-secondary'] + '1A',
    onSecondaryContainer: Colors.light['text-secondary'],
    
    // Tertiary colors
    tertiary: Colors.light['semantic-warning'],
    onTertiary: Colors.light['background-surface'],
    tertiaryContainer: Colors.light['semantic-warning'] + '1A',
    onTertiaryContainer: Colors.light['semantic-warning'],
    
    // Error colors
    error: Colors.light['semantic-error'],
    onError: Colors.light['background-surface'],
    errorContainer: Colors.light['semantic-error'] + '1A',
    onErrorContainer: Colors.light['semantic-error'],
    
    // Background colors
    background: Colors.light['background-primary'],
    onBackground: Colors.light['text-primary'],
    surface: Colors.light['background-surface'],
    onSurface: Colors.light['text-primary'],
    surfaceVariant: Colors.light['background-primary'],
    onSurfaceVariant: Colors.light['text-secondary'],
    
    // Outline and borders
    outline: Colors.light['border-subtle'],
    outlineVariant: Colors.light['border-subtle'] + '80', // 50% opacity
    
    // Surface tints
    surfaceDisabled: Colors.light['text-secondary'] + '1F', // 12% opacity
    onSurfaceDisabled: Colors.light['text-secondary'] + '61', // 38% opacity
    backdrop: '#00000050', // 50% black overlay
    
    // Elevation surfaces
    elevation: {
      level0: 'transparent',
      level1: Colors.light['background-surface'],
      level2: Colors.light['background-surface'],
      level3: Colors.light['background-surface'],
      level4: Colors.light['background-surface'],
      level5: Colors.light['background-surface'],
    },
  },
};

export const paperDarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Primary colors
    primary: Colors.dark['action-primary'],
    onPrimary: Colors.dark['action-primary-text'],
    primaryContainer: Colors.dark['action-primary'] + '1A', // 10% opacity
    onPrimaryContainer: Colors.dark['action-primary'],
    
    // Secondary colors
    secondary: Colors.dark['text-secondary'],
    onSecondary: Colors.dark['background-surface'],
    secondaryContainer: Colors.dark['text-secondary'] + '1A',
    onSecondaryContainer: Colors.dark['text-secondary'],
    
    // Tertiary colors
    tertiary: Colors.dark['semantic-warning'],
    onTertiary: Colors.dark['background-surface'],
    tertiaryContainer: Colors.dark['semantic-warning'] + '1A',
    onTertiaryContainer: Colors.dark['semantic-warning'],
    
    // Error colors
    error: Colors.dark['semantic-error'],
    onError: Colors.dark['background-surface'],
    errorContainer: Colors.dark['semantic-error'] + '1A',
    onErrorContainer: Colors.dark['semantic-error'],
    
    // Background colors
    background: Colors.dark['background-primary'],
    onBackground: Colors.dark['text-primary'],
    surface: Colors.dark['background-surface'],
    onSurface: Colors.dark['text-primary'],
    surfaceVariant: Colors.dark['background-primary'],
    onSurfaceVariant: Colors.dark['text-secondary'],
    
    // Outline and borders
    outline: Colors.dark['border-subtle'],
    outlineVariant: Colors.dark['border-subtle'] + '80', // 50% opacity
    
    // Surface tints
    surfaceDisabled: Colors.dark['text-secondary'] + '1F', // 12% opacity
    onSurfaceDisabled: Colors.dark['text-secondary'] + '61', // 38% opacity
    backdrop: '#00000080', // 80% black overlay for dark theme
    
    // Elevation surfaces
    elevation: {
      level0: 'transparent',
      level1: Colors.dark['background-surface'],
      level2: '#2D3748', // Slightly lighter than surface
      level3: '#374151', // Even lighter
      level4: '#4B5563', // More elevation
      level5: '#6B7280', // Highest elevation
    },
  },
};
