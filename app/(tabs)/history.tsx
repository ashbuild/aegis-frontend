import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Placeholder data for transactions
const transactionsData = [
  { id: '1', category: 'Food', merchant: 'Starbucks', icon: 'coffee', date: 'Jul 25, 2025', amount: '-$5.20' },
  { id: '2', category: 'Tech', merchant: 'Amazon', icon: 'shopping-cart', date: 'Jul 24, 2025', amount: '-$34.99' },
  { id: '3', category: 'Food', merchant: 'Whole Foods', icon: 'shopping-bag', date: 'Jul 23, 2025', amount: '-$78.50' },
  { id: '4', category: 'Lifestyle', merchant: 'Gym Membership', icon: 'activity', date: 'Jul 22, 2025', amount: '-$45.00' },
  { id: '5', category: 'Education', merchant: 'Coursera', icon: 'book', date: 'Jul 21, 2025', amount: '-$15.00' },
  { id: '6', category: 'Miscellaneous', merchant: 'Pharmacy', icon: 'plus-circle', date: 'Jul 20, 2025', amount: '-$12.75' },
  { id: '7', category: 'Food', merchant: 'Restaurant', icon: 'coffee', date: 'Jul 19, 2025', amount: '-$25.00' },
];

const categories = ['All', 'Food', 'Tech', 'Education', 'Lifestyle', 'Miscellaneous'];

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions = selectedCategory === 'All'
    ? transactionsData
    : transactionsData.filter(transaction => transaction.category === selectedCategory);

  const renderCategoryChip = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        { backgroundColor: selectedCategory === item ? themeColors.tint : themeColors.card },
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryChipText,
        { color: selectedCategory === item ? themeColors.background : themeColors.primaryText },
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTransactionItem = ({ item }: { item: typeof transactionsData[0] }) => (
    <View style={[styles.transactionCard, { backgroundColor: themeColors.card }]}>
      <Feather name={item.icon as any} size={24} color={themeColors.primaryText} style={styles.transactionIcon} />
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionMerchant, { color: themeColors.primaryText }]}>{item.merchant}</Text>
        <Text style={[styles.transactionDate, { color: themeColors.secondaryText }]}>{item.date}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: themeColors.primaryText }]}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
        <FlatList
          data={categories}
          renderItem={renderCategoryChip}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  categoryFilter: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionsList: {
    paddingHorizontal: 20,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionIcon: {
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
