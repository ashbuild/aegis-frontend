import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Card, Button, FAB, Surface, useTheme } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

import InsightsWidget from '@/components/widgets/InsightsWidget';
import TransactionsWidget from '@/components/widgets/TransactionsWidget';
import IntelligentHubsWidget from '@/components/widgets/IntelligentHubsWidget';

import { Spacing, Accessibility } from '@/constants/DesignSystem';

export default function HomeScreen() {
  const theme = useTheme();

  const handleScanReceipt = () => {
    router.push('/(tabs)/scan');
  };

  const handleAddManually = () => {
    // Navigate to a manual entry form or modal
    // For now, we'll show an alert or navigate to scan with a flag
    router.push('/(tabs)/scan');
  };

  const handleFABPress = () => {
    router.push('/(tabs)/scan');
  };

  const WelcomeHeader = () => (
    <Animated.View 
      entering={FadeInDown.delay(100)}
      style={styles.header}
    >
      <Text 
        variant="headlineLarge"
        style={[styles.title, { color: theme.colors.onBackground }]}
      >
        Welcome to Aegis
      </Text>
      <Text 
        variant="bodyLarge"
        style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
      >
        Your intelligent financial companion
      </Text>
    </Animated.View>
  );

  const QuickActionsCard = () => (
    <Animated.View entering={FadeInDown.delay(200)}>
      <Card 
        mode="elevated"
        style={styles.quickActionsCard}
      >
        <Card.Content>
          <Text 
            variant="titleLarge"
            style={[styles.cardTitle, { color: theme.colors.onSurface }]}
          >
            Quick Actions
          </Text>
          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              onPress={handleScanReceipt}
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
            >
              Scan Receipt
            </Button>
            <Button
              mode="outlined"
              onPress={handleAddManually}
              style={styles.actionButton}
              contentStyle={styles.actionButtonContent}
            >
              Add Manually
            </Button>
          </View>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  return (
    <View 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeHeader />
        <QuickActionsCard />
        <InsightsWidget />
        <TransactionsWidget />
        <IntelligentHubsWidget />
        
        {/* Bottom spacing for FAB */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      {/* Floating Action Button */}
      <FAB
        icon="plus"
        size="medium"
        variant="primary"
        style={styles.fab}
        onPress={handleFABPress}
        accessibilityLabel={Accessibility.labels.scanReceipt}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  quickActionsCard: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    marginBottom: Spacing.md,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  actionButtonContent: {
    paddingVertical: 8,
  },
  bottomSpacing: {
    height: 100, // Space for FAB
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
  },
});
