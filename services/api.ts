import { auth } from '@/config/firebase';

// Base API configuration
const API_BASE_URL = 'https://api.aegis.com'; // Replace with your actual API endpoint
const MOCK_MODE = true; // Set to false when real API is available

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  icon: string;
}

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  nutritionScore: number;
  quantity: number;
}

interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface Subscription {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  nextBilling: string;
  category: string;
}

class APIService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    if (MOCK_MODE) {
      // Return mock data based on endpoint
      return this.getMockData(endpoint);
    }

    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  private getMockData(endpoint: string) {
    switch (endpoint) {
      case '/transactions':
        return Promise.resolve(this.getMockTransactions());
      case '/grocery-items':
        return Promise.resolve(this.getMockGroceryItems());
      case '/spending-breakdown':
        return Promise.resolve(this.getMockSpendingBreakdown());
      case '/subscriptions':
        return Promise.resolve(this.getMockSubscriptions());
      case '/nutrition-data':
        return Promise.resolve(this.getMockNutritionData());
      case '/calorie-data':
        return Promise.resolve(this.getMockCalorieData());
      case '/spending-trends':
        return Promise.resolve(this.getMockSpendingTrends());
      default:
        return Promise.resolve({});
    }
  }

  // Transaction APIs
  async getTransactions(): Promise<Transaction[]> {
    return this.makeRequest('/transactions');
  }

  async addTransaction(transaction: Partial<Transaction>): Promise<Transaction> {
    return this.makeRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  // KitchenIQ APIs
  async getGroceryItems(): Promise<GroceryItem[]> {
    return this.makeRequest('/grocery-items');
  }

  async getNutritionData() {
    return this.makeRequest('/nutrition-data');
  }

  async getCalorieData() {
    return this.makeRequest('/calorie-data');
  }

  async generateRecipe(ingredients: string[]) {
    return this.makeRequest('/generate-recipe', {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
    });
  }

  // WalletWatch APIs
  async getSpendingBreakdown(): Promise<SpendingCategory[]> {
    return this.makeRequest('/spending-breakdown');
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return this.makeRequest('/subscriptions');
  }

  async getSpendingTrends() {
    return this.makeRequest('/spending-trends');
  }

  // Mock data generators
  private getMockTransactions(): Transaction[] {
    return [
      { id: '1', merchant: 'Starbucks', amount: -12.50, date: '2025-01-27', category: 'Food & Drink', icon: 'coffee' },
      { id: '2', merchant: 'Amazon', amount: -54.99, date: '2025-01-26', category: 'Shopping', icon: 'shopping-cart' },
      { id: '3', merchant: 'Shell', amount: -45.30, date: '2025-01-25', category: 'Transportation', icon: 'truck' },
      { id: '4', merchant: 'Whole Foods', amount: -89.45, date: '2025-01-24', category: 'Groceries', icon: 'shopping-bag' },
      { id: '5', merchant: 'Netflix', amount: -15.99, date: '2025-01-23', category: 'Entertainment', icon: 'play' },
    ];
  }

  private getMockGroceryItems(): GroceryItem[] {
    return [
      { id: '1', name: 'Organic Bananas', category: 'Fruits', expiryDate: '2025-01-30', nutritionScore: 85, quantity: 6 },
      { id: '2', name: 'Greek Yogurt', category: 'Dairy', expiryDate: '2025-02-05', nutritionScore: 92, quantity: 1 },
      { id: '3', name: 'Chicken Breast', category: 'Meat', expiryDate: '2025-01-29', nutritionScore: 95, quantity: 2 },
      { id: '4', name: 'Spinach', category: 'Vegetables', expiryDate: '2025-01-28', nutritionScore: 100, quantity: 1 },
      { id: '5', name: 'Quinoa', category: 'Grains', expiryDate: '2025-06-15', nutritionScore: 88, quantity: 1 },
    ];
  }

  private getMockSpendingBreakdown(): SpendingCategory[] {
    return [
      { name: 'Groceries', amount: 320.50, percentage: 35, color: '#4CAF50' },
      { name: 'Transportation', amount: 180.00, percentage: 20, color: '#2196F3' },
      { name: 'Entertainment', amount: 145.99, percentage: 16, color: '#FF9800' },
      { name: 'Food & Drink', amount: 125.75, percentage: 14, color: '#E91E63' },
      { name: 'Shopping', amount: 135.25, percentage: 15, color: '#9C27B0' },
    ];
  }

  private getMockSubscriptions(): Subscription[] {
    return [
      { id: '1', name: 'Netflix', amount: 15.99, frequency: 'Monthly', nextBilling: '2025-02-15', category: 'Entertainment' },
      { id: '2', name: 'Spotify', amount: 9.99, frequency: 'Monthly', nextBilling: '2025-02-10', category: 'Entertainment' },
      { id: '3', name: 'Amazon Prime', amount: 14.99, frequency: 'Monthly', nextBilling: '2025-02-03', category: 'Shopping' },
      { id: '4', name: 'Gym Membership', amount: 29.99, frequency: 'Monthly', nextBilling: '2025-02-01', category: 'Health' },
    ];
  }

  private getMockNutritionData() {
    return {
      protein: { value: 85, target: 100, unit: 'g' },
      carbs: { value: 220, target: 250, unit: 'g' },
      fat: { value: 65, target: 80, unit: 'g' },
      fiber: { value: 28, target: 35, unit: 'g' },
      highlights: ['High in protein this week!', 'Great fiber intake', 'Consider more healthy fats'],
    };
  }

  private getMockCalorieData() {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: [1850, 2100, 1950, 2200, 1800, 2300, 2000],
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
      }],
      target: 2000,
    };
  }

  private getMockSpendingTrends() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        data: [1200, 1350, 1100, 1400, 1250, 1300],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
        strokeWidth: 2,
      }],
    };
  }
}

export const apiService = new APIService();
export type { Transaction, GroceryItem, SpendingCategory, Subscription };
