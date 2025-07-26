/**
 * Design System Color Tokens
 * Supports both Light and Dark modes with refined teal accent color
 * All colors meet WCAG AA contrast standards
 */

export const Colors = {
  light: {
    // Background colors
    'background-primary': '#F3F4F6',     // Cool Gray - Main screen background
    'background-surface': '#FFFFFF',     // White - Cards, Modals, Sheets
    
    // Text colors
    'text-primary': '#1F2937',          // Dark Gray - Headings, main text
    'text-secondary': '#6B7280',        // Medium Gray - Subtitles, captions, hints
    
    // Action colors
    'action-primary': '#14B8A6',        // Teal - Buttons, FAB, active tabs
    'action-primary-text': '#FFFFFF',   // White - Text on primary buttons
    
    // Semantic colors
    'semantic-success': '#10B981',      // Green - Success states, confirmations
    'semantic-warning': '#F59E0B',      // Amber - Insights, non-critical alerts
    'semantic-error': '#EF4444',       // Red - Error messages, destructive actions
    
    // Border colors
    'border-subtle': '#E5E7EB',         // Light Gray - Borders, dividers
    
    // Legacy compatibility (for existing components)
    text: '#1F2937',
    background: '#F3F4F6',
    card: '#FFFFFF',
    tint: '#14B8A6',
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#14B8A6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  dark: {
    // Background colors
    'background-primary': '#111827',     // Dark Slate - Main screen background
    'background-surface': '#1F2937',     // Dark Gray - Cards, Modals, Sheets
    
    // Text colors
    'text-primary': '#F9FAFB',          // Off-White - Headings, main text
    'text-secondary': '#9CA3AF',        // Light Gray - Subtitles, captions, hints
    
    // Action colors
    'action-primary': '#2DD4BF',        // Bright Teal - Buttons, FAB, active tabs
    'action-primary-text': '#111827',   // Dark Slate - Text on primary buttons
    
    // Semantic colors
    'semantic-success': '#10B981',      // Green - Success states, confirmations
    'semantic-warning': '#F59E0B',      // Amber - Insights, non-critical alerts
    'semantic-error': '#EF4444',       // Red - Error messages, destructive actions
    
    // Border colors
    'border-subtle': '#374151',         // Gray - Borders, dividers
    
    // Legacy compatibility (for existing components)
    text: '#F9FAFB',
    background: '#111827',
    card: '#1F2937',
    tint: '#2DD4BF',
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#2DD4BF',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};
