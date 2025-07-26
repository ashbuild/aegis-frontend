import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui';
import { Spacing } from '@/constants/DesignSystem';
import { useDesignTheme } from '@/hooks/useDesignTheme';
import { apiService, type SpendingCategory, type Subscription } from '@/services/api';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

export default function WalletWatchScreen() {
  const { colors } = useDesignTheme();
  const [spendingBreakdown, setSpendingBreakdown] = useState<SpendingCategory[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [spendingTrends, setSpendingTrends] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [breakdown, subs, trends] = await Promise.all([
        apiService.getSpendingBreakdown(),
        apiService.getSubscriptions(),
        apiService.getSpendingTrends(),
      ]);
      setSpendingBreakdown(breakdown);
      setSubscriptions(subs);
      setSpendingTrends(trends);
    } catch (error) {
      console.error('Error loading WalletWatch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPieChartData = () => {
    return spendingBreakdown.map((category) => ({
      name: category.name,
      population: category.amount,
      color: category.color,
      legendFontColor: colors['text-primary'],
      legendFontSize: 12,
    }));
  };

  const getTotalSpending = () => {
    return spendingBreakdown.reduce((total, category) => total + category.amount, 0);
  };

  const getUpcomingSubscriptions = () => {
    return subscriptions
      .sort((a, b) => new Date(a.nextBilling).getTime() - new Date(b.nextBilling).getTime())
      .slice(0, 3);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="h1" style={styles.title}>WalletWatch</ThemedText>

        {/* Spending Overview */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Monthly Overview</ThemedText>
          <View style={styles.cardContent}>
            {loading ? (
              <ThemedText type="body">Loading spending data...</ThemedText>
            ) : (
              <View style={styles.overviewContent}>
                <ThemedText type="h2" style={styles.totalAmount}>
                  ${getTotalSpending().toFixed(2)}
                </ThemedText>
                <ThemedText type="body" style={styles.overviewLabel}>
                  Total spent this month
                </ThemedText>
              </View>
            )}
          </View>
        </Card>

        {/* Spending Breakdown */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Spending Breakdown</ThemedText>
          <View style={styles.cardContent}>
            {loading || spendingBreakdown.length === 0 ? (
              <ThemedText type="body">Loading spending breakdown...</ThemedText>
            ) : (
              <>
                <PieChart
                  data={formatPieChartData()}
                  width={screenWidth - 64}
                  height={220}
                  chartConfig={{
                    backgroundColor: colors['background-surface'],
                    backgroundGradientFrom: colors['background-surface'],
                    backgroundGradientTo: colors['background-surface'],
                    color: (opacity = 1) => colors['text-primary'] + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                  style={styles.chart}
                />
                <View style={styles.categoryList}>
                  {spendingBreakdown.map((category) => (
                    <View key={category.name} style={styles.categoryItem}>
                      <View style={[styles.categoryColor, { backgroundColor: category.color }]} />
                      <View style={styles.categoryInfo}>
                        <ThemedText type="body" style={styles.categoryName}>{category.name}</ThemedText>
                        <ThemedText type="caption" style={styles.categoryPercentage}>
                          {category.percentage}% • ${category.amount.toFixed(2)}
                        </ThemedText>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </Card>

        {/* Subscription Spotlight */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Subscription Spotlight</ThemedText>
          <View style={styles.cardContent}>
            {loading ? (
              <ThemedText type="body">Loading your subscriptions...</ThemedText>
            ) : (
              <>
                <ThemedText type="body" style={styles.subscriptionHeader}>
                  Upcoming renewals
                </ThemedText>
                {getUpcomingSubscriptions().map((subscription) => (
                  <View key={subscription.id} style={styles.subscriptionItem}>
                    <View style={styles.subscriptionIcon}>
                      <Feather name="credit-card" size={20} color={colors['text-secondary']} />
                    </View>
                    <View style={styles.subscriptionInfo}>
                      <ThemedText type="body" style={styles.subscriptionName}>
                        {subscription.name}
                      </ThemedText>
                      <ThemedText type="caption" style={styles.subscriptionBilling}>
                        Next: {new Date(subscription.nextBilling).toLocaleDateString()}
                      </ThemedText>
                    </View>
                    <ThemedText type="body" style={styles.subscriptionAmount}>
                      ${subscription.amount}
                    </ThemedText>
                  </View>
                ))}
                <ThemedText type="caption" style={styles.subscriptionTotal}>
                  Total monthly: ${subscriptions.reduce((total, sub) => total + sub.amount, 0).toFixed(2)}
                </ThemedText>
              </>
            )}
          </View>
        </Card>

        {/* Spending Trends */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Spending Trends</ThemedText>
          <View style={styles.cardContent}>
            {loading || !spendingTrends ? (
              <ThemedText type="body">Loading spending trends...</ThemedText>
            ) : (
              <LineChart
                data={spendingTrends}
                width={screenWidth - 64}
                height={220}
                yAxisLabel="$"
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: colors['background-surface'],
                  backgroundGradientFrom: colors['background-surface'],
                  backgroundGradientTo: colors['background-surface'],
                  decimalPlaces: 0,
                  color: (opacity = 1) => colors['action-primary'] + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  labelColor: (opacity = 1) => colors['text-primary'] + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  strokeWidth: 2,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: colors['action-primary']
                  }
                }}
                bezier
                style={styles.chart}
              />
            )}
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
  overviewContent: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  overviewLabel: {
    color: '#666',
    marginTop: Spacing.xs,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: 8,
  },
  categoryList: {
    marginTop: Spacing.md,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  categoryColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: Spacing.sm,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontWeight: '600',
  },
  categoryPercentage: {
    color: '#666',
    marginTop: 2,
  },
  subscriptionHeader: {
    marginBottom: Spacing.md,
    color: '#666',
  },
  subscriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  subscriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionName: {
    fontWeight: '600',
  },
  subscriptionBilling: {
    color: '#666',
    marginTop: 2,
  },
  subscriptionAmount: {
    fontWeight: '600',
    fontSize: 16,
  },
  subscriptionTotal: {
    textAlign: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    fontWeight: '600',
  },
});
