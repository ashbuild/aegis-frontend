/**
 * Example Dashboard using React Native Paper components
 * This demonstrates how to integrate Paper components into existing screens
 */

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Card,
  Text,
  Button,
  Chip,
  FAB,
  Surface,
  IconButton,
  useTheme,
} from 'react-native-paper';

export function PaperDashboardExample() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Surface style={styles.headerSurface} elevation={2}>
          <View style={styles.header}>
            <View>
              <Text variant="headlineSmall" style={{ color: theme.colors.onSurface }}>
                Good morning, User!
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Here's your daily overview
              </Text>
            </View>
            <IconButton
              icon="bell"
              size={24}
              onPress={() => {}}
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            />
          </View>
        </Surface>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Card style={styles.statCard} mode="elevated">
            <Card.Content>
              <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                Total Balance
              </Text>
              <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
                $12,345.67
              </Text>
              <View style={styles.chipContainer}>
                <Chip icon="trending-up" compact>+5.2%</Chip>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.statCard} mode="elevated">
            <Card.Content>
              <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                This Month
              </Text>
              <Text variant="headlineMedium" style={{ color: theme.colors.secondary }}>
                $2,847.32
              </Text>
              <View style={styles.chipContainer}>
                <Chip icon="trending-down" compact>-2.1%</Chip>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Recent Transactions */}
        <Card style={styles.transactionsCard} mode="outlined">
          <Card.Title 
            title="Recent Transactions" 
            subtitle="Last 7 days"
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
          />
          <Card.Content>
            {[
              { name: 'Grocery Store', amount: -45.67, category: 'Food' },
              { name: 'Salary Deposit', amount: +3250.00, category: 'Income' },
              { name: 'Gas Station', amount: -38.92, category: 'Transport' },
            ].map((transaction, index) => (
              <Surface key={index} style={styles.transactionItem} elevation={1}>
                <View style={styles.transactionInfo}>
                  <Text variant="bodyLarge">{transaction.name}</Text>
                  <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                    {transaction.category}
                  </Text>
                </View>
                <Text 
                  variant="bodyLarge" 
                  style={{ 
                    color: transaction.amount > 0 ? theme.colors.tertiary : theme.colors.error,
                    fontWeight: 'bold'
                  }}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </Surface>
            ))}
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => {}}>View All</Button>
            <Button mode="contained" onPress={() => {}}>Add Transaction</Button>
          </Card.Actions>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.actionsCard} mode="elevated">
          <Card.Title title="Quick Actions" />
          <Card.Content>
            <View style={styles.actionButtons}>
              <Button 
                mode="contained-tonal" 
                icon="camera" 
                onPress={() => {}}
                style={styles.actionButton}
              >
                Scan Receipt
              </Button>
              <Button 
                mode="contained-tonal" 
                icon="chart-line" 
                onPress={() => {}}
                style={styles.actionButton}
              >
                View Analytics
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Add some bottom padding for the FAB */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        size="medium"
        variant="primary"
        style={styles.fab}
        onPress={() => {}}
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
    padding: 16,
  },
  headerSurface: {
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
  },
  chipContainer: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  transactionsCard: {
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  transactionInfo: {
    flex: 1,
  },
  actionsCard: {
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
