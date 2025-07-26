# API Integration Guide

## Overview
This document outlines the API integrations for the Aegis financial app, including current implementations and future enhancements.

## Current State
- **Mock Mode**: Currently running with mock data for all endpoints
- **Firebase**: Authentication integrated and working
- **Charts**: Functional charts with mock data

## API Service Architecture

### Core API Service (`services/api.ts`)
The centralized API service handles all data operations with:
- Mock data fallback for development
- Authentication token integration
- Error handling and retry logic
- Type safety with TypeScript interfaces

### Configuration (`config/api.ts`)
- Environment-based API URL management
- Mock data flags for testing
- Integration keys for external services
- Rate limiting and timeout configuration

## Current Integrations

### 1. Transactions API
**Status**: Mock Implementation ✅
**Endpoints**:
- `GET /api/transactions` - Fetch user transactions
- `POST /api/transactions` - Add new transaction

**Mock Data Includes**:
- Transaction history with categories
- Merchant information
- Amount and date tracking
- Icons for visual representation

### 2. KitchenIQ API
**Status**: Mock Implementation ✅
**Features**:
- Grocery item tracking
- Nutrition data analysis
- Calorie charts
- Recipe generation (mock)

**Endpoints**:
- `GET /api/grocery-items` - Fetch grocery inventory
- `GET /api/nutrition-data` - Get nutrition analysis
- `GET /api/calorie-data` - Get calorie tracking data
- `POST /api/generate-recipe` - Generate recipe suggestions

### 3. WalletWatch API
**Status**: Mock Implementation ✅
**Features**:
- Spending breakdown by category
- Subscription tracking
- Spending trends analysis

**Endpoints**:
- `GET /api/spending-breakdown` - Category-wise spending
- `GET /api/subscriptions` - Active subscriptions
- `GET /api/spending-trends` - Historical spending patterns

## Navigation Implementation

### 1. TransactionsWidget Navigation ✅
- Tappable widget redirects to History tab
- Displays recent transactions with real-time data
- Shows formatted dates and amounts

### 2. IntelligentHubsWidget Navigation ✅
- KitchenIQ and WalletWatch navigation working
- Disabled hubs (InvestBank, Eco-Track) properly handled
- Touch feedback and visual states

### 3. Enhanced Pages ✅
- **KitchenIQ**: Full functionality with charts and recipe input
- **WalletWatch**: Pie charts, line graphs, subscription management
- **History**: Enhanced transaction list with filtering and search

## Chart Integration

### Libraries Used
- `react-native-chart-kit` for data visualization
- `react-native-svg` for chart rendering

### Implemented Charts
1. **Bar Chart** (KitchenIQ) - Calorie tracking
2. **Pie Chart** (WalletWatch) - Spending breakdown
3. **Line Chart** (WalletWatch) - Spending trends

## Future API Integrations

### 1. Banking Integration (Plaid)
**Priority**: High
**Implementation Plan**:
```typescript
// Plaid configuration
const PLAID_CONFIG = {
  clientId: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: 'sandbox', // sandbox, development, production
};

// Link bank accounts
async function linkBankAccount(publicToken: string) {
  // Exchange public token for access token
  // Store securely and fetch transactions
}
```

### 2. Receipt Scanning (OCR)
**Priority**: High
**Technologies**: Google Vision API, AWS Textract
**Implementation**:
- Camera integration for receipt capture
- OCR processing for transaction extraction
- Automatic categorization

### 3. AI-Powered Recipe Generation
**Priority**: Medium
**Technologies**: OpenAI GPT-4, Spoonacular API
**Features**:
- Ingredient-based recipe suggestions
- Nutritional analysis
- Meal planning

### 4. Real-time Financial Insights
**Priority**: Medium
**Features**:
- Spending pattern analysis
- Budget recommendations
- Savings opportunities

## Environment Setup

### Required Environment Variables
```bash
# Firebase (Already configured)
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id

# Banking Integration
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret

# AI Services
OPENAI_API_KEY=your_openai_key
SPOONACULAR_API_KEY=your_spoonacular_key

# Nutrition API
NUTRITIONIX_APP_ID=your_app_id
NUTRITIONIX_API_KEY=your_api_key
```

## Switching to Production APIs

### 1. Update API Configuration
```typescript
// config/api.ts
export const API_CONFIG = {
  MOCK_MODE: false, // Disable mock mode
  PRODUCTION_API_URL: 'https://api.aegis.com',
  // ... other config
};
```

### 2. Implement Real Endpoints
Replace mock data generators with actual API calls in `services/api.ts`

### 3. Error Handling
Implement proper error handling for network failures, authentication errors, and rate limiting.

### 4. Caching Strategy
Implement data caching for offline functionality and improved performance.

## Testing Strategy

### Current Testing
- Mock data provides consistent testing environment
- All UI components functional with realistic data
- Navigation flows tested and working

### Future Testing
- Unit tests for API service methods
- Integration tests with real API endpoints
- End-to-end testing for complete user flows

## Security Considerations

### Current Security
- Firebase authentication for user management
- Secure token storage with expo-secure-store
- Environment variable protection

### Future Security
- API key rotation strategy
- Encryption for sensitive financial data
- PCI compliance for payment processing
- Bank-level security for financial data

## Performance Optimization

### Current Optimizations
- Lazy loading of chart data
- Efficient React rendering with keys
- Image optimization for icons

### Future Optimizations
- API response caching
- Background data sync
- Offline-first architecture
- Progressive data loading

## Getting Started

1. **Current Setup** (Mock Mode):
   ```bash
   npm install
   npm start
   ```

2. **Production Setup** (When ready):
   - Set up environment variables
   - Configure real API endpoints
   - Update API_CONFIG.MOCK_MODE to false
   - Deploy backend services

## Contributing

When adding new API integrations:
1. Add mock data generator first
2. Define TypeScript interfaces
3. Implement API service methods
4. Add error handling
5. Update this documentation

## Support

For questions about API integrations, refer to:
- Firebase documentation for authentication
- React Native Chart Kit docs for charts
- Individual service documentation for external APIs
