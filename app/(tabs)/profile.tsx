import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
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
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed: " + error.message);
    }
  };

  const renderBadge = ({ item }: { item: typeof badgesData[0] }) => (
    <View style={[styles.badgeCard, { backgroundColor: themeColors.card }]}>
      <Feather name={item.icon as any} size={30} color={themeColors.tint} />
      <Text style={[styles.badgeText, { color: themeColors.primaryText }]}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.profileHeader}>
        <View style={[styles.avatar, { backgroundColor: themeColors.tint }]}>
          <Text style={[styles.avatarText, { color: themeColors.background }]}>
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={[styles.userName, { color: themeColors.primaryText }]}>{user?.email || 'User Name'}</Text>
        <Text style={[styles.userEmail, { color: themeColors.secondaryText }]}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.primaryText }]}>Account Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={[styles.settingText, { color: themeColors.primaryText }]}>Change Password</Text>
          <Feather name="chevron-right" size={20} color={themeColors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <Text style={[styles.settingText, { color: themeColors.error }]}>Logout</Text>
          <Feather name="log-out" size={20} color={themeColors.error} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: themeColors.card }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.primaryText }]}>Awards & Badges</Text>
        <FlatList
          data={badgesData}
          renderItem={renderBadge}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.badgeColumnWrapper}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
  },
  section: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333', // Use a slightly lighter border for dark theme
  },
  settingText: {
    fontSize: 16,
  },
  badgeColumnWrapper: {
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});
