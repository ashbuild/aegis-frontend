import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui';
import { Spacing } from '@/constants/DesignSystem';
import { useDesignTheme } from '@/hooks/useDesignTheme';

export default function WalletWatchScreen() {
  const { colors } = useDesignTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="h1" style={styles.title}>WalletWatch</ThemedText>

        {/* Spending Breakdown */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Spending Breakdown</ThemedText>
          <View style={styles.cardContent}>
            {/* TODO: Add Donut Chart */}
            <ThemedText type="body">Loading spending breakdown...</ThemedText>
          </View>
        </Card>

        {/* Subscription Spotlight */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Subscription Spotlight</ThemedText>
          <View style={styles.cardContent}>
            {/* TODO: Add subscription list */}
            <ThemedText type="body">Loading your subscriptions...</ThemedText>
          </View>
        </Card>

        {/* Spending Trends */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Spending Trends</ThemedText>
          <View style={styles.cardContent}>
            {/* TODO: Add line chart */}
            <ThemedText type="body">Loading spending trends...</ThemedText>
          </View>
        </Card>
      </ScrollView>
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
  title: {
    marginBottom: Spacing.xl,
  },
  card: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  cardTitle: {
    marginBottom: Spacing.sm,
  },
  cardContent: {
    marginTop: Spacing.sm,
    minHeight: 200,
  },
});
