import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { 
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { Stack, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';
import 'react-native-reanimated';
import { useEffect, useState, createContext, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { onAuthStateChanged, User } from 'firebase/auth';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { auth } from '@/config/firebase';

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
    console.log('🔄 Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔥 Auth state changed:', user ? `User: ${user.email} (${user.uid})` : 'No user');
      setUser(user);
      setIsLoading(false);
    });
    return () => {
      console.log('🔄 Cleaning up auth state listener');
      unsubscribe();
    };
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
    console.log('🚦 Navigation effect triggered');
    console.log('isLoading:', isLoading);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('segments:', segments);
    
    if (isLoading) {
      console.log('⏳ Still loading, skipping navigation logic');
      return;
    }

    // Safe check for segments array
    const currentSegment = segments && segments.length > 0 ? segments[0] : null;
    const inTabsGroup = currentSegment === '(tabs)';
    const inAuthFlow = currentSegment === 'login' || currentSegment === 'register';

    console.log('📍 Navigation analysis:', {
      currentSegment,
      inTabsGroup,
      inAuthFlow,
      isAuthenticated
    });

    if (isAuthenticated) {
      if (inAuthFlow) {
        // User is authenticated but on login/register page, redirect to tabs
        console.log('🚀 Redirecting authenticated user from auth flow to tabs');
        router.replace('/(tabs)');
      } else if (!inTabsGroup) {
        // User is authenticated but not in tabs or auth flow, redirect to tabs
        console.log('🚀 Redirecting authenticated user to tabs');
        router.replace('/(tabs)');
      }
    } else if (!isAuthenticated && inTabsGroup) {
      // User is not authenticated, but trying to access tabs, redirect to login
      console.log('🔒 Redirecting unauthenticated user to login');
      router.replace('/login');
    } else {
      console.log('✅ User is on the correct screen, no navigation needed');
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
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
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
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
