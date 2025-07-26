import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, useColorScheme, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { apiService, type Transaction } from '@/services/api';

const categories = ['All', 'Food & Drink', 'Shopping', 'Transportation', 'Groceries', 'Entertainment'];

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
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
      <TouchableOpacity
        key={item}
        style={[
          styles.categoryChip,
          { backgroundColor: isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].card },
          isSelected && styles.selectedChip,
        ]}
        onPress={() => setSelectedCategory(item)}
      >
        <ThemedText style={{ color: isSelected ? '#FFFFFF' : Colors[colorScheme ?? 'light'].text, fontFamily: 'Poppins-Bold' }}>
          {item}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <ThemedView style={[styles.transactionCard, { shadowColor: Colors[colorScheme ?? 'light'].text }]}>
      <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <Feather name={item.icon as any} size={20} color={Colors[colorScheme ?? 'light'].icon} />
      </View>
      <View style={styles.transactionDetails}>
        <ThemedText style={styles.transactionMerchant}>{item.merchant}</ThemedText>
        <ThemedText style={styles.transactionDate}>{formatDate(item.date)}</ThemedText>
        <ThemedText style={styles.transactionCategory}>{item.category}</ThemedText>
      </View>
      <ThemedText style={[styles.transactionAmount, { color: item.amount < 0 ? '#F44336' : '#4CAF50' }]}>
        {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount).toFixed(2)}
      </ThemedText>
    </ThemedView>
  );

  const totalSpent = filteredTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Transaction History</ThemedText>
      
      {/* Summary Card */}
      <ThemedView style={[styles.summaryCard, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <ThemedText style={styles.summaryLabel}>
          {selectedCategory === 'All' ? 'Total Transactions' : `${selectedCategory} Spending`}
        </ThemedText>
        <ThemedText style={styles.summaryAmount}>${totalSpent.toFixed(2)}</ThemedText>
        <ThemedText style={styles.summaryCount}>
          {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
        </ThemedText>
      </ThemedView>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollView}>
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
            tintColor={Colors[colorScheme ?? 'light'].tint}
          />
        }
        ListEmptyComponent={
          loading ? (
            <ThemedText style={styles.emptyText}>Loading transactions...</ThemedText>
          ) : (
            <ThemedText style={styles.emptyText}>No transactions found</ThemedText>
          )
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryContainer: {
    paddingBottom: 16,
  },
  categoryScrollView: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedChip: {
    elevation: 4,
    shadowOpacity: 0.2,
  },
  transactionsList: {
    paddingHorizontal: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  transactionCategory: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'Poppins',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  summaryCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins',
  },
  summaryAmount: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginVertical: 4,
  },
  summaryCount: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Poppins',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
});
