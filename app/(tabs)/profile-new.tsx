import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { 
  Card, 
  Text, 
  Button, 
  Avatar, 
  Chip, 
  List, 
  Surface, 
  useTheme, 
  IconButton,
  Divider 
} from 'react-native-paper';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { useAuth } from '../_layout';
import { auth } from '@/config/firebase';

// Placeholder data for badges
const badgesData = [
  { id: '1', name: 'Frugal Finisher', icon: 'currency-usd' },
  { id: '2', name: 'Subscription Slayer', icon: 'scissors-cutting' },
  { id: '3', name: 'Receipt Master', icon: 'receipt' },
  { id: '4', name: 'Insight Seeker', icon: 'lightbulb-outline' },
];

export default function ProfileScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await SecureStore.deleteItemAsync('authToken');
      router.replace('/login');
    } catch (error: any) {
      console.error("Logout failed", error);
      Alert.alert("Logout Error", "Logout failed: " + error.message);
    }
  };

  const getUserInitials = () => {
    const email = user?.email || 'User';
    return email.substring(0, 2).toUpperCase();
  };

  const ProfileHeader = () => (
    <Surface style={styles.profileHeader} elevation={2}>
      <Avatar.Text 
        size={80} 
        label={getUserInitials()}
        style={{ backgroundColor: theme.colors.primary }}
      />
      <Text variant="headlineSmall" style={styles.userName}>
        {user?.email?.split('@')[0] || 'User Name'}
      </Text>
      <Text variant="bodyMedium" style={[styles.userEmail, { color: theme.colors.onSurfaceVariant }]}>
        {user?.email || 'user@example.com'}
      </Text>
    </Surface>
  );

  const BadgesSection = () => (
    <Card style={styles.section} mode="elevated">
      <Card.Title 
        title="Achievements" 
        subtitle="Your earned badges"
        left={(props) => <IconButton {...props} icon="trophy" />}
      />
      <Card.Content>
        <View style={styles.badgesGrid}>
          {badgesData.map((badge) => (
            <Surface key={badge.id} style={styles.badgeItem} elevation={1}>
              <IconButton 
                icon={badge.icon} 
                size={24}
                iconColor={theme.colors.primary}
              />
              <Text variant="bodySmall" style={styles.badgeText}>
                {badge.name}
              </Text>
            </Surface>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  const SettingsSection = () => (
    <Card style={styles.section} mode="elevated">
      <Card.Title 
        title="Settings" 
        left={(props) => <IconButton {...props} icon="cog" />}
      />
      <Card.Content>
        <List.Item
          title="Account Settings"
          description="Manage your account preferences"
          left={props => <List.Icon {...props} icon="account-settings" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title="Privacy & Security"
          description="Control your privacy settings"
          left={props => <List.Icon {...props} icon="shield-account" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title="Notifications"
          description="Manage notification preferences"
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title="Help & Support"
          description="Get help and contact support"
          left={props => <List.Icon {...props} icon="help-circle" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => {}}
          style={styles.listItem}
        />
      </Card.Content>
    </Card>
  );

  const StatsSection = () => (
    <Card style={styles.section} mode="elevated">
      <Card.Title 
        title="Your Stats" 
        left={(props) => <IconButton {...props} icon="chart-line" />}
      />
      <Card.Content>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
              42
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Receipts Scanned
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={{ color: theme.colors.secondary }}>
              $1,247
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Total Tracked
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="headlineSmall" style={{ color: theme.colors.tertiary }}>
              15
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Days Active
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ProfileHeader />
      <StatsSection />
      <BadgesSection />
      <SettingsSection />
      
      <Card style={[styles.section, styles.logoutSection]} mode="elevated">
        <Card.Content>
          <Button
            mode="outlined"
            onPress={handleLogout}
            icon="logout"
            textColor={theme.colors.error}
            style={[styles.logoutButton, { borderColor: theme.colors.error }]}
          >
            Sign Out
          </Button>
        </Card.Content>
      </Card>
      
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
    borderRadius: 12,
  },
  userName: {
    marginTop: 12,
    fontWeight: 'bold',
  },
  userEmail: {
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  badgeText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 10,
  },
  listItem: {
    paddingVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  logoutSection: {
    marginTop: 8,
  },
  logoutButton: {
    marginVertical: 8,
  },
  bottomSpacing: {
    height: 40,
  },
});
