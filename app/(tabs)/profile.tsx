import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '../_layout';

// Placeholder data for badges
const badgesData = [
  { id: '1', name: 'Frugal Finisher', icon: 'dollar-sign' },
  { id: '2', name: 'Subscription Slayer', icon: 'scissors' },
  { id: '3', name: 'Receipt Master', icon: 'file-text' },
  { id: '4', name: 'Insight Seeker', icon: 'lightbulb' },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await SecureStore.deleteItemAsync('userToken');
      router.replace('/login');
    } catch (error: any) {
      console.error("Logout failed", error);
      alert("Logout failed: " + error.message);
    }
  };

  const renderBadge = ({ item }: { item: typeof badgesData[0] }) => (
    <ThemedView style={[styles.badgeCard, { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }]}>
      <Feather name={item.icon as any} size={30} color={themeColors.tint} />
      <ThemedText style={styles.badgeText}>{item.name}</ThemedText>
    </ThemedView>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ThemedView style={styles.profileHeader}>
        <ThemedView style={[styles.avatar, { backgroundColor: themeColors.tint }]}>
          <ThemedText style={styles.avatarText} lightColor="#FFFFFF" darkColor="#FFFFFF">
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.userName}>{user?.email || 'User Name'}</ThemedText>
        <ThemedText style={styles.userEmail} type="subtitle">{user?.email || 'user@example.com'}</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.section, { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }]}>
        <ThemedText style={styles.sectionTitle}>Account Settings</ThemedText>
        <TouchableOpacity style={styles.settingItem}>
          <ThemedText style={styles.settingText}>Change Password</ThemedText>
          <Feather name="chevron-right" size={20} color={themeColors.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <ThemedText style={[styles.settingText, { color: themeColors.error }]}>Logout</ThemedText>
          <Feather name="log-out" size={20} color={themeColors.error} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={[styles.section, { elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 }]}>
        <ThemedText style={styles.sectionTitle}>Awards & Badges</ThemedText>
        <FlatList
          data={badgesData}
          renderItem={renderBadge}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.badgeColumnWrapper}
          scrollEnabled={false}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 48,
    fontFamily: 'Poppins-Bold',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Poppins',
    opacity: 0.7,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  badgeColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  badgeCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Poppins',
    textAlign: 'center',
    lineHeight: 18,
  },
});
