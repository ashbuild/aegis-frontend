# 🔥 Firebase Integration Guide

## Overview

Your Aegis React Native app now has a fully integrated Firebase authentication system with environment-based configuration management.

## 📂 Files Created/Modified

### Configuration Files
- `app.config.js` - Expo configuration with environment variables
- `config/firebase.ts` - Firebase initialization and configuration
- `config/auth.ts` - Authentication utilities and test helpers

### Updated Files
- `app/_layout.tsx` - Updated to use centralized Firebase config
- `app/login.tsx` - Updated to use centralized auth
- `app/register.tsx` - Updated to use centralized auth
- `app/(tabs)/profile.tsx` - Updated to use centralized auth

### Test Component
- `components/widgets/FirebaseTestWidget.tsx` - Testing component for Firebase integration

## 🔐 Environment Variables

Your `.env` file contains the following Firebase credentials:

```properties
FIREBASE_API_KEY="AIzaSyCcCdqh9fn84o8rqk9CbPQsmOSQDD0QWno"
FIREBASE_AUTH_DOMAIN="project-aegis-9821a.firebaseapp.com"
FIREBASE_PROJECT_ID="project-aegis-9821a"
FIREBASE_STORAGE_BUCKET="project-aegis-9821a.firebasestorage.app"
FIREBASE_MESSAGING_SENDER_ID="657535469173"
FIREBASE_APP_ID="1:657535469173:web:edb9f37a6fc12d626f5a3c"
TEST_USER_EMAIL="test@user.com"
TEST_USER_PASSWORD="passwordlol"
```

## 🛠️ How It Works

### 1. Environment Variable Loading
- Expo loads variables from `.env` file at startup
- Variables are exported to `app.config.js` via `process.env`
- `expo-constants` provides access to these variables in your app

### 2. Firebase Configuration
- `config/firebase.ts` initializes Firebase with environment variables
- Validates all required configuration values are present
- Exports centralized `auth` instance for use throughout the app

### 3. Authentication Flow
- All auth screens (`login.tsx`, `register.tsx`, `profile.tsx`) use the centralized `auth` instance
- `config/auth.ts` provides helper functions for testing and validation

## 🧪 Testing Firebase Integration

The app includes a Firebase Test Widget on the home screen with three test buttons:

1. **Test Config** - Validates Firebase configuration is properly loaded
2. **Test Credentials** - Shows test user credentials are available
3. **Test Auth** - Attempts to authenticate with Firebase using test credentials

## 🚀 Usage Examples

### Basic Authentication
```typescript
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user.email);
  } catch (error) {
    console.error('Sign in error:', error);
  }
};
```

### Using Test Helpers
```typescript
import { signInWithTestUser, getTestCredentials } from '@/config/auth';

// Sign in with test user
const testAuth = async () => {
  try {
    const userCredential = await signInWithTestUser();
    console.log('Test user signed in:', userCredential.user.email);
  } catch (error) {
    console.error('Test auth failed:', error);
  }
};

// Get test credentials
const { email, password } = getTestCredentials();
```

## 🔒 Security Notes

### Development vs Production
- Environment variables are embedded in the client bundle
- For production, consider using Expo Secure Store for sensitive data
- The current `.env` file is for development/testing purposes

### Firebase Security Rules
- Ensure your Firebase project has proper security rules configured
- Test user credentials should only be used in development

## 📱 Features Implemented

✅ **Environment-based Configuration**
- Automatic loading of Firebase credentials from `.env`
- Validation of required configuration values
- Support for development/production environments

✅ **Centralized Authentication**
- Single `auth` instance used throughout the app
- Consistent error handling and user state management
- Integration with existing authentication screens

✅ **Test Infrastructure**
- Built-in testing component for verifying Firebase connection
- Helper functions for test user authentication
- Configuration validation utilities

✅ **Type Safety**
- Full TypeScript integration
- Proper error handling and type checking
- IntelliSense support for Firebase methods

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration Error**
   - Ensure all environment variables are set in `.env`
   - Check that `app.config.js` is properly exporting variables
   - Verify Firebase project settings match your credentials

2. **Authentication Errors**
   - Check Firebase Authentication is enabled in your project
   - Verify email/password authentication is configured
   - Ensure test user exists or will be created automatically

3. **Environment Variables Not Loading**
   - Restart development server after changing `.env`
   - Ensure `.env` file is in the project root
   - Check for typos in variable names

### Development Server
- Environment variables are loaded automatically on `expo start`
- Changes to `.env` require server restart
- Variables are visible in terminal output during startup

## 🎯 Next Steps

1. **Test the Integration**
   - Open the app and navigate to the home screen
   - Use the Firebase Test Widget to verify all components work
   - Test authentication flow with login/register screens

2. **Customize for Your Needs**
   - Modify test user credentials as needed
   - Add additional Firebase services (Firestore, Storage, etc.)
   - Implement proper error handling for production

3. **Security Hardening**
   - Configure Firebase security rules
   - Implement proper user management
   - Add email verification and password reset functionality

Your Firebase integration is now complete and ready for development! 🎉
