/**
 * Design System Accessibility
 * Defines accessibility labels, roles, and helpers for inclusive design
 */

export const Accessibility = {
  // Common accessibility labels
  labels: {
    // Navigation
    homeTab: 'Home tab',
    scanTab: 'Scan receipt tab',
    chatTab: 'Chat with Aegnt',
    historyTab: 'Transaction history tab',
    profileTab: 'Profile tab',
    
    // Actions
    scanReceipt: 'Scan receipt button',
    addTransaction: 'Add transaction',
    viewMore: 'View more details',
    close: 'Close',
    back: 'Go back',
    save: 'Save',
    cancel: 'Cancel',
    
    // Status
    loading: 'Loading content',
    error: 'Error occurred',
    success: 'Action completed successfully',
    
    // Form elements
    requiredField: 'Required field',
    optionalField: 'Optional field',
    
    // Charts and data
    chart: 'Data visualization chart',
    chartDescription: 'Chart showing financial data',
    
    // Widgets
    insightsWidget: 'Financial insights widget',
    transactionsWidget: 'Recent transactions widget',
    intelligentHubsWidget: 'Intelligent hubs widget',
  },

  // Accessibility roles
  roles: {
    button: 'button',
    tab: 'tab',
    tabPanel: 'tabpanel',
    header: 'header',
    main: 'main',
    navigation: 'navigation',
    list: 'list',
    listItem: 'listitem',
    image: 'image',
    text: 'text',
    alert: 'alert',
    dialog: 'dialog',
  },

  // Accessibility hints
  hints: {
    tapToOpen: 'Double tap to open',
    tapToClose: 'Double tap to close',
    tapToSelect: 'Double tap to select',
    swipeForMore: 'Swipe left or right for more options',
    pullToRefresh: 'Pull down to refresh',
    longPressForMenu: 'Long press for menu options',
  },

  // Helper functions
  helpers: {
    // Creates a complete accessibility props object
    createAccessibilityProps: (
      label: string,
      hint?: string,
      role?: string,
      state?: { selected?: boolean; disabled?: boolean; expanded?: boolean }
    ) => ({
      accessible: true,
      accessibilityLabel: label,
      accessibilityHint: hint,
      accessibilityRole: role as any,
      accessibilityState: state,
    }),

    // Creates tab accessibility props
    createTabProps: (label: string, selected: boolean, index: number) => ({
      accessible: true,
      accessibilityLabel: label,
      accessibilityRole: 'tab' as const,
      accessibilityState: { selected },
      accessibilityHint: selected ? 'Currently selected tab' : 'Double tap to switch to this tab',
    }),

    // Creates button accessibility props
    createButtonProps: (label: string, hint?: string, disabled = false) => ({
      accessible: true,
      accessibilityLabel: label,
      accessibilityRole: 'button' as const,
      accessibilityHint: hint || 'Double tap to activate',
      accessibilityState: { disabled },
    }),

    // Creates form field accessibility props
    createFormFieldProps: (
      label: string,
      required = false,
      error?: string,
      value?: string
    ) => ({
      accessible: true,
      accessibilityLabel: `${label}${required ? ', required field' : ', optional field'}`,
      accessibilityValue: value ? { text: value } : undefined,
      accessibilityHint: error || 'Enter text',
      accessibilityState: { invalid: !!error },
    }),
  },
} as const;
