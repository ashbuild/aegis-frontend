import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View, Text } from 'react-native';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import { useColorScheme } from '@/hooks/useColorScheme';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated && !inAuthGroup) {
      // User is authenticated, but not in the auth group, redirect to home
      router.replace('/(tabs)/index');
    } else if (!isAuthenticated && inAuthGroup) {
      // User is not authenticated, but in the auth group, redirect to login
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, segments]);

  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10, fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    console.warn('Font loading error:', error);
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootLayoutNav />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
