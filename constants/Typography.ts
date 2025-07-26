/**
 * Design System Typography
 * Based on Inter font family with Poppins fallback
 * Follows 8pt grid system for consistent spacing
 */

export const Typography = {
  // Font families
  fontFamily: {
    primary: 'Inter',
    fallback: 'Poppins-Regular',
    bold: 'Poppins-Bold',
  },

  // Font sizes (in points)
  fontSize: {
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 18,
    body: 16,
    bodySmall: 14,
    caption: 12,
    label: 10,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Line heights (following 8pt grid)
  lineHeight: {
    h1: 40,
    h2: 32,
    h3: 28,
    h4: 24,
    body: 24,
    bodySmall: 20,
    caption: 16,
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
