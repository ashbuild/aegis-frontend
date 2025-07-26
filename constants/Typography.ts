/**
 * Design System Typography
 * Using Plus Jakarta Sans for modern, clean typography
 * With optimized sizes for better visual hierarchy
 */

export const Typography = {
  // Font families
  fontFamily: {
    primary: 'PlusJakartaSans-Regular',
    medium: 'PlusJakartaSans-Medium',
    semiBold: 'PlusJakartaSans-SemiBold',
    bold: 'PlusJakartaSans-Bold',
  },

  // Font sizes (in points) - Updated for better visual hierarchy
  fontSize: {
    h1: 32,
    h2: 26,
    h3: 22,
    h4: 19,
    body: 16,
    bodySmall: 14,
    caption: 13,
    label: 11,
  },

  // Font weights - Mapped to actual font files
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Line heights (optimized for readability)
  lineHeight: {
    h1: 44, // Increased for better heading presence
    h2: 36,
    h3: 32,
    h4: 28,
    body: 24,
    bodySmall: 20,
    caption: 18,
    label: 16,
  },

  // Text styles (complete style objects)
  textStyles: {
    h1: {
      fontFamily: 'Poppins-Bold',
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 40,
    },
    h2: {
      fontFamily: 'Poppins-Bold',
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    h3: {
      fontFamily: 'Poppins-Bold',
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    h4: {
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    label: {
      fontFamily: 'Poppins-Regular',
      fontSize: 10,
      fontWeight: '500' as const,
      lineHeight: 16,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
  },
} as const;
