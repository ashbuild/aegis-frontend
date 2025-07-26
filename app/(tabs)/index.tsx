import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Button, Card, FAB } from '@/components/ui';
import InsightsWidget from '@/components/widgets/InsightsWidget';
import TransactionsWidget from '@/components/widgets/TransactionsWidget';
import IntelligentHubsWidget from '@/components/widgets/IntelligentHubsWidget';
import FirebaseTestWidget from '@/components/widgets/FirebaseTestWidget';

import { useDesignTheme } from '@/hooks/useDesignTheme';
import { Spacing, Accessibility } from '@/constants/DesignSystem';

export default function HomeScreen() {
  const { colors, spacing, isDark } = useDesignTheme();

  const WelcomeHeader = () => (
    <Animated.View 
      entering={FadeInDown.delay(100)}
      style={styles.header}
    >
      <ThemedText 
        type="h1" 
        colorToken="text-primary"
        accessibilityRole="header"
      >
        Welcome to Aegis
      </ThemedText>
      <ThemedText 
        type="body" 
        colorToken="text-secondary"
        style={styles.subtitle}
      >
        Your intelligent financial companion
      </ThemedText>
    </Animated.View>
  );

  const QuickActionsCard = () => (
    <Animated.View entering={FadeInDown.delay(200)}>
      <Card 
        elevation="medium"
        style={styles.quickActionsCard}
        accessibilityLabel="Quick actions"
      >
        <ThemedText 
          type="h4" 
          colorToken="text-primary"
          style={styles.cardTitle}
        >
          Quick Actions
        </ThemedText>
        <View style={styles.buttonRow}>
          <Button
            title="Scan Receipt"
            variant="primary"
            size="medium"
            style={styles.actionButton}
            accessibilityHint="Scan a new receipt to add transaction"
          />
          <Button
            title="Add Manually"
            variant="secondary"
            size="medium"
            style={styles.actionButton}
            accessibilityHint="Manually add a new transaction"
          />
        </View>
      </Card>
    </Animated.View>
  );

  return (
    <ThemedView 
      style={styles.container}
      backgroundToken="background-primary"
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Home screen content"
      >
        <WelcomeHeader />
        <QuickActionsCard />
        <InsightsWidget />
        <TransactionsWidget />
        <IntelligentHubsWidget />
        
        {/* Firebase Integration Test */}
        <FirebaseTestWidget />
        
        {/* Bottom spacing for FAB */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      
      {/* Floating Action Button */}
      <FAB
        icon="plus"
        size="large"
        variant="primary"
        rotateOnPress={true}
        style={styles.fab}
        accessibilityLabel={Accessibility.labels.scanReceipt}
        accessibilityHint="Quick scan receipt"
      />
    </ThemedView>
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
  subtitle: {
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  quickActionsCard: {
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
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
