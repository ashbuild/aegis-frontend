import * as ExpoSecureStore from 'expo-secure-store';

// Wrapper for expo-secure-store to ensure consistent method names and error handling
export const SecureStore = {
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await ExpoSecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('SecureStore.setItem failed:', error);
      throw error;
    }
  },

  getItem: async (key: string): Promise<string | null> => {
    try {
      return await ExpoSecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore.getItem failed:', error);
      throw error;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await ExpoSecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('SecureStore.removeItem failed:', error);
      throw error;
    }
  }
};
