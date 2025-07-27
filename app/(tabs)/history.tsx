import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView, RefreshControl } from 'react-native';
import { 
  Text,
  Surface,
  Card,
  Chip,
  useTheme,
  IconButton,
  ActivityIndicator
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { apiService, type Transaction } from '@/services/api';

const categories = ['All', 'Food & Drink', 'Shopping', 'Transportation', 'Groceries', 'Entertainment'];

export default function HistoryScreen() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await apiService.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const filteredTransactions = selectedCategory === 'All'
    ? transactions
    : transactions.filter(transaction => transaction.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const renderCategoryChip = (item: string) => {
    const isSelected = selectedCategory === item;
    return (
      <Chip
        key={item}
        mode={isSelected ? 'flat' : 'outlined'}
        selected={isSelected}
        onPress={() => setSelectedCategory(item)}
        style={styles.categoryChip}
      >
        {item}
      </Chip>
    );
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <Card style={styles.transactionCard} mode="elevated">
      <Card.Content style={styles.transactionContent}>
        <Surface style={styles.iconContainer} elevation={1}>
          <Feather 
            name={item.icon as any} 
            size={20} 
            color={theme.colors.primary}
          />
        </Surface>
        <View style={styles.transactionDetails}>
          <Text variant="titleMedium" style={styles.transactionMerchant}>
            {item.merchant}
          </Text>
          <Text 
            variant="bodySmall" 
            style={[styles.transactionDate, { color: theme.colors.onSurfaceVariant }]}
          >
            {formatDate(item.date)}
          </Text>
          <Text 
            variant="labelSmall" 
            style={[styles.transactionCategory, { color: theme.colors.outline }]}
          >
            {item.category}
          </Text>
        </View>
        <Text 
          variant="titleMedium" 
          style={[
            styles.transactionAmount, 
            { color: item.amount < 0 ? theme.colors.error : '#4CAF50' }
          ]}
        >
          {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
        </Text>
      </Card.Content>
    </Card>
  );

  const totalSpent = filteredTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.headerSurface} elevation={1}>
        <Text variant="headlineSmall" style={[styles.header, { color: theme.colors.onSurface }]}>
          Transaction History
        </Text>
      </Surface>
      
      {/* Summary Card */}
      <Card style={styles.summaryCard} mode="elevated">
        <Card.Content style={styles.summaryContent}>
          <Text 
            variant="bodyMedium" 
            style={[styles.summaryLabel, { color: theme.colors.onSurfaceVariant }]}
          >
            {selectedCategory === 'All' ? 'Total Transactions' : `${selectedCategory} Spending`}
          </Text>
          <Text variant="headlineMedium" style={[styles.summaryAmount, { color: theme.colors.primary }]}>
            ${totalSpent.toFixed(2)}
          </Text>
          <Text 
            variant="bodySmall" 
            style={[styles.summaryCount, { color: theme.colors.outline }]}
          >
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScrollView}
        >
          {categories.map(cat => renderCategoryChip(cat))}
        </ScrollView>
      </View>
      
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator size="large" />
              <Text variant="bodyMedium" style={styles.emptyText}>
                Loading transactions...
              </Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text variant="bodyMedium" style={styles.emptyText}>
                No transactions found
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSurface: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    fontWeight: 'bold',
  },
  categoryContainer: {
    paddingBottom: 16,
  },
  categoryScrollView: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  transactionsList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  transactionCard: {
    marginBottom: 12,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    fontWeight: '600',
  },
  transactionDate: {
    marginTop: 2,
  },
  transactionCategory: {
    marginTop: 2,
  },
  transactionAmount: {
    fontWeight: '600',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryLabel: {
    textAlign: 'center',
  },
  summaryAmount: {
    fontWeight: 'bold',
    marginVertical: 4,
  },
  summaryCount: {
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
  },
});
