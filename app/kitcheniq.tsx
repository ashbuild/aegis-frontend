import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui';
import { Spacing } from '@/constants/DesignSystem';
import { useDesignTheme } from '@/hooks/useDesignTheme';

export default function KitchenIQScreen() {
  const { colors } = useDesignTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="h1" style={styles.title}>KitchenIQ</ThemedText>

        {/* What's New & What to Use First */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>What's New & What to Use First</ThemedText>
          <View style={styles.cardContent}>
            {/* TODO: Add list of recently purchased items */}
            <ThemedText type="body">Loading your grocery items...</ThemedText>
          </View>
        </Card>

        {/* Nutrition Snapshot */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Nutrition Snapshot</ThemedText>
          <View style={styles.cardContent}>
            <ThemedText type="body" style={styles.highlight}>High in protein this week!</ThemedText>
          </View>
        </Card>

        {/* Recipe on Demand */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Recipe on Demand</ThemedText>
          <View style={styles.cardContent}>
            {/* TODO: Add text input and button */}
            <ThemedText type="body">What do you want to make?</ThemedText>
          </View>
        </Card>

        {/* Calorie Chart */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Calorie Chart</ThemedText>
          <View style={styles.cardContent}>
            {/* TODO: Add bar chart */}
            <ThemedText type="body">Loading calorie distribution...</ThemedText>
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
  },
  highlight: {
    fontWeight: '600',
  },
});
