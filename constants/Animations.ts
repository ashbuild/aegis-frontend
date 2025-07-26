/**
 * Design System Animations
 * Defines timing, easing, and animation configurations for microinteractions
 */

export const Animations = {
  // Timing constants
  timing: {
    fast: 150,
    normal: 250,
    slow: 350,
    slower: 500,
  },

  // Easing curves
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Spring configurations for react-native-reanimated
  spring: {
    gentle: {
      damping: 15,
      stiffness: 150,
      mass: 1,
    },
    bouncy: {
      damping: 10,
      stiffness: 200,
      mass: 0.8,
    },
    snappy: {
      damping: 20,
      stiffness: 300,
      mass: 0.5,
    },
  },

  // Pre-configured animations
  presets: {
    // State changes (loading to content)
    crossFade: {
      duration: 250,
      type: 'timing' as const,
    },

    // List item entrance
    fadeInUp: {
      duration: 300,
      type: 'timing' as const,
      stagger: 50, // Delay between items
    },

    // Button press feedback
    buttonPress: {
      scale: 0.95,
      duration: 100,
      type: 'timing' as const,
    },

    // FAB rotation
    fabRotation: {
      duration: 200,
      type: 'timing' as const,
      rotation: '45deg', // From + to x
    },

    // Chart drawing
    chartDraw: {
      duration: 800,
      type: 'timing' as const,
    },

    // Modal appearance
    modalSlideUp: {
      duration: 350,
      type: 'spring' as const,
      config: 'gentle',
    },

    // Tab switch
    tabSwitch: {
      duration: 200,
      type: 'timing' as const,
    },
  },
} as const;
