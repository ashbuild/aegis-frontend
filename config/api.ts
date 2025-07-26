// API Configuration and Environment Management

export const API_CONFIG = {
  // Development/Mock mode
  MOCK_MODE: true, // Set to false when real API is available
  
  // API Base URLs
  PRODUCTION_API_URL: 'https://api.aegis.com',
  DEVELOPMENT_API_URL: 'https://dev-api.aegis.com',
  
  // Firebase-based endpoints (for future backend integration)
  FIREBASE_FUNCTIONS_URL: 'https://us-central1-project-aegis-9821a.cloudfunctions.net',
  
  // External service integrations
  PLAID_ENV: 'sandbox', // sandbox, development, production
  SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY || '',
  
  // Rate limiting and retry configuration
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milliseconds
  REQUEST_TIMEOUT: 10000, // 10 seconds
};

export const getApiUrl = () => {
  if (API_CONFIG.MOCK_MODE) {
    return null; // Mock mode doesn't need real URLs
  }
  
  // In a real app, you'd check the environment
  return __DEV__ ? API_CONFIG.DEVELOPMENT_API_URL : API_CONFIG.PRODUCTION_API_URL;
};

// Mock data flags - can be toggled individually for testing
export const MOCK_FLAGS = {
  TRANSACTIONS: true,
  GROCERY_ITEMS: true,
  SPENDING_BREAKDOWN: true,
  SUBSCRIPTIONS: true,
  NUTRITION_DATA: true,
  RECIPE_GENERATION: true,
};

// API endpoints
export const ENDPOINTS = {
  TRANSACTIONS: '/api/transactions',
  GROCERY_ITEMS: '/api/grocery-items',
  SPENDING_BREAKDOWN: '/api/spending-breakdown',
  SUBSCRIPTIONS: '/api/subscriptions',
  NUTRITION_DATA: '/api/nutrition-data',
  CALORIE_DATA: '/api/calorie-data',
  SPENDING_TRENDS: '/api/spending-trends',
  GENERATE_RECIPE: '/api/generate-recipe',
  SCAN_RECEIPT: '/api/scan-receipt',
  FINANCIAL_INSIGHTS: '/api/insights',
};

// Integration keys (these would typically be in environment variables)
export const INTEGRATION_CONFIG = {
  // Plaid for bank account integration
  PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID || '',
  PLAID_SECRET: process.env.PLAID_SECRET || '',
  
  // OpenAI for recipe generation and insights
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  
  // Nutritionix for nutrition data
  NUTRITIONIX_APP_ID: process.env.NUTRITIONIX_APP_ID || '',
  NUTRITIONIX_API_KEY: process.env.NUTRITIONIX_API_KEY || '',
};

export default API_CONFIG;
