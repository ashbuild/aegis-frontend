import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui';
import { Colors, Spacing, Typography, Accessibility } from '@/constants/DesignSystem';
import { useColorScheme } from '@/hooks/useColorScheme';

const insights = [
  { 
    id: '1', 
    text: "Your spending on 'Eating Out' is up 30% this month.", 
    type: 'warning' as const,
    priority: 'medium' as const
  },
  { 
    id: '2', 
    text: 'You have a new bill due soon: Electricity - $75', 
    type: 'info' as const,
    priority: 'high' as const
  },
  { 
    id: '3', 
    text: 'Your grocery spending is down 15% from last month.', 
    type: 'success' as const,
    priority: 'low' as const
  },
];

export default function InsightsWidget() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getInsightColor = (type: 'warning' | 'info' | 'success') => {
    switch (type) {
      case 'warning':
        return colors['semantic-warning'];
      case 'success':
        return colors['semantic-success'];
      case 'info':
      default:
        return colors['action-primary'];
    }
  };

  const renderInsightCard = ({ item, index }: { item: typeof insights[0], index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
    >
      <Card
        elevation="medium"
        glassmorphism={true}
        style={[
          styles.widget,
          { 
            backgroundColor: getInsightColor(item.type),
            borderLeftWidth: 4,
            borderLeftColor: colors['background-surface'],
          }
        ]}
        accessibilityLabel={`Insight: ${item.text}`}
        accessibilityRole="button"
      >
        <ThemedText 
          style={[
            Typography.textStyles.body,
            {
              color: colors['background-surface'],
              fontWeight: Typography.fontWeight.medium,
            }
          ]}
          accessible={false} // Parent Card handles accessibility
        >
          {item.text}
        </ThemedText>
      </Card>
    </Animated.View>
  );

  return (
    <ThemedView 
      style={styles.container}
      backgroundToken="background-primary"
      accessibilityLabel={Accessibility.labels.insightsWidget}
    >
      <ThemedText 
        type="h3" 
        style={styles.title}
        colorToken="text-primary"
        accessibilityRole="header"
      >
        Insights
      </ThemedText>
      <FlatList
        data={insights}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderInsightCard}
        contentContainerStyle={styles.listContent}
        accessibilityLabel="Insights list"
        decelerationRate="fast"
        snapToInterval={280 + Spacing.md} // Card width + margin
        snapToAlignment="start"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  listContent: {
    paddingLeft: Spacing.md,
  },
  widget: {
    width: 280,
    height: 120,
    borderRadius: Spacing.component.borderRadiusLarge,
    padding: Spacing.md,
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
});
