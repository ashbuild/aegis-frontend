import Constants from 'expo-constants';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

// Test user credentials from environment variables
export const getTestCredentials = () => ({
  email: Constants.expoConfig?.extra?.testUserEmail || 'test@user.com',
  password: Constants.expoConfig?.extra?.testUserPassword || 'passwordlol',
});

// Retry function with exponential backoff
const retryOperation = async (operation: () => Promise<any>, maxRetries = 3, baseDelay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      if (error.code === 'auth/network-request-failed' && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Retry attempt ${attempt} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
};

// Helper function to sign in with test credentials
export const signInWithTestUser = async () => {
  const { email, password } = getTestCredentials();
  try {
    console.log('Attempting to sign in test user...');
    const userCredential = await retryOperation(
      () => signInWithEmailAndPassword(auth, email, password)
    );
    console.log('Test user sign in successful');
    return userCredential;
  } catch (error: any) {
    console.log('Error during test user sign in:', error.code);
    if (error.code === 'auth/user-not-found') {
      console.log('Test user not found, creating new user...');
      // If test user doesn't exist, create it
      return await retryOperation(
        () => createUserWithEmailAndPassword(auth, email, password)
      );
    }
    throw error;
  }
};

// Helper function to validate Firebase configuration
export const validateFirebaseConfig = () => {
  const config = Constants.expoConfig?.extra;
  const requiredFields = [
    'firebaseApiKey',
    'firebaseAuthDomain', 
    'firebaseProjectId',
    'firebaseStorageBucket',
    'firebaseMessagingSenderId',
    'firebaseAppId'
  ];
  
  const missingFields = requiredFields.filter(field => !config?.[field]);
  
  if (missingFields.length > 0) {
    throw new Error(
      `Missing Firebase configuration: ${missingFields.join(', ')}. ` +
      'Please check your .env file and app.config.js'
    );
  }
  
  return true;
};
