/**
 * Design System Spacing
 * Based on 8pt grid system for harmonious and professional layout
 * All values are in points
 */

export const Spacing = {
  // Base grid unit (8pt)
  grid: 8,

  // Spacing scale
  xs: 4,    // 0.5 grid units
  sm: 8,    // 1 grid unit
  md: 16,   // 2 grid units
  lg: 24,   // 3 grid units
  xl: 32,   // 4 grid units
  xxl: 40,  // 5 grid units
  xxxl: 48, // 6 grid units

  // Component-specific spacing
  component: {
    // Minimum touch target size (44x44pt)
    touchTarget: 44,
    
    // Common padding values
    paddingTiny: 4,
    paddingSmall: 8,
    paddingMedium: 16,
    paddingLarge: 24,
    paddingXLarge: 32,

    // Common margin values
    marginTiny: 4,
    marginSmall: 8,
    marginMedium: 16,
    marginLarge: 24,
    marginXLarge: 32,

    // Border radius
    borderRadiusSmall: 4,
    borderRadiusMedium: 8,
    borderRadiusLarge: 12,
    borderRadiusXLarge: 16,

    // Icon sizes
    iconSmall: 16,
    iconMedium: 24,
    iconLarge: 32,
    iconXLarge: 40,

    // Button heights
    buttonSmall: 32,
    buttonMedium: 44,
    buttonLarge: 56,

    // Card spacing
    cardPadding: 16,
    cardMargin: 16,
    cardBorderRadius: 12,

    // Tab bar
    tabBarHeight: 80,
    tabBarIconSize: 24,

    // Header
    headerHeight: 44,
  },
} as const;
