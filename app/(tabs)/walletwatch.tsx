import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { 
  Text,
  Card,
  Surface,
  useTheme,
  ActivityIndicator,
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/DesignSystem';
import { apiService, type SpendingCategory, type Subscription } from '@/services/api';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

export default function WalletWatchScreen() {
  const theme = useTheme();
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
      legendFontColor: theme.colors.onSurface,
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Surface style={styles.headerSurface} elevation={1}>
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            WalletWatch
          </Text>
        </Surface>

        {/* Spending Overview */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Monthly Overview"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading spending data...
                </Text>
              </View>
            ) : (
              <View style={styles.overviewContent}>
                <Text 
                  variant="displaySmall" 
                  style={[styles.totalAmount, { color: '#4CAF50' }]}
                >
                  ${getTotalSpending().toFixed(2)}
                </Text>
                <Text 
                  variant="bodyMedium" 
                  style={[styles.overviewLabel, { color: theme.colors.onSurfaceVariant }]}
                >
                  Total spent this month
                </Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Spending Breakdown */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Spending Breakdown"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading || spendingBreakdown.length === 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading spending breakdown...
                </Text>
              </View>
            ) : (
              <>
                <PieChart
                  data={formatPieChartData()}
                  width={screenWidth - 64}
                  height={220}
                  chartConfig={{
                    backgroundColor: theme.colors.surface,
                    backgroundGradientFrom: theme.colors.surface,
                    backgroundGradientTo: theme.colors.surface,
                    color: (opacity = 1) => theme.colors.onSurface + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                  style={styles.chart}
                />
                <View style={styles.categoryList}>
                  {spendingBreakdown.map((category, index) => (
                    <View key={category.name}>
                      <View style={styles.categoryItem}>
                        <Surface style={[styles.categoryColor, { backgroundColor: category.color }]} elevation={1}>
                          <View />
                        </Surface>
                        <View style={styles.categoryInfo}>
                          <Text variant="bodyLarge" style={styles.categoryName}>
                            {category.name}
                          </Text>
                          <Text 
                            variant="bodySmall" 
                            style={[styles.categoryPercentage, { color: theme.colors.onSurfaceVariant }]}
                          >
                            {category.percentage}% • ${category.amount.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                      {index < spendingBreakdown.length - 1 && <Divider />}
                    </View>
                  ))}
                </View>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Subscription Spotlight */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Subscription Spotlight"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading your subscriptions...
                </Text>
              </View>
            ) : (
              <>
                <Text 
                  variant="bodyMedium" 
                  style={[styles.subscriptionHeader, { color: theme.colors.onSurfaceVariant }]}
                >
                  Upcoming renewals
                </Text>
                {getUpcomingSubscriptions().map((subscription, index) => (
                  <View key={subscription.id}>
                    <View style={styles.subscriptionItem}>
                      <Surface style={styles.subscriptionIcon} elevation={1}>
                        <Feather name="credit-card" size={20} color={theme.colors.primary} />
                      </Surface>
                      <View style={styles.subscriptionInfo}>
                        <Text variant="bodyLarge" style={styles.subscriptionName}>
                          {subscription.name}
                        </Text>
                        <Text 
                          variant="bodySmall" 
                          style={[styles.subscriptionBilling, { color: theme.colors.onSurfaceVariant }]}
                        >
                          Next: {new Date(subscription.nextBilling).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text variant="titleMedium" style={[styles.subscriptionAmount, { color: theme.colors.primary }]}>
                        ${subscription.amount}
                      </Text>
                    </View>
                    {index < getUpcomingSubscriptions().length - 1 && <Divider />}
                  </View>
                ))}
                <Divider style={{ marginVertical: 16 }} />
                <Text 
                  variant="titleSmall" 
                  style={[styles.subscriptionTotal, { color: theme.colors.onSurface }]}
                >
                  Total monthly: ${subscriptions.reduce((total, sub) => total + sub.amount, 0).toFixed(2)}
                </Text>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Spending Trends */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Spending Trends"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading || !spendingTrends ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading spending trends...
                </Text>
              </View>
            ) : (
              <LineChart
                data={spendingTrends}
                width={screenWidth - 64}
                height={220}
                yAxisLabel="$"
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: theme.colors.surface,
                  backgroundGradientFrom: theme.colors.surface,
                  backgroundGradientTo: theme.colors.surface,
                  decimalPlaces: 0,
                  color: (opacity = 1) => theme.colors.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  labelColor: (opacity = 1) => theme.colors.onSurface + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  strokeWidth: 2,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: theme.colors.primary
                  }
                }}
                bezier
                style={styles.chart}
              />
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
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
  },
  headerSurface: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: Spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: Spacing.lg,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  overviewContent: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  totalAmount: {
    fontWeight: 'bold',
  },
  overviewLabel: {
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
    marginTop: 2,
  },
  subscriptionHeader: {
    marginBottom: Spacing.md,
  },
  subscriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  subscriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginTop: 2,
  },
  subscriptionAmount: {
    fontWeight: '600',
  },
  subscriptionTotal: {
    textAlign: 'center',
    fontWeight: '600',
  },
});
