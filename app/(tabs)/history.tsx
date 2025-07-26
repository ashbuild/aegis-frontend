import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

const transactionsData = [
  { id: '1', category: 'Food', merchant: 'Starbucks', icon: 'coffee', date: 'Jul 25, 2025', amount: -5.20 },
  { id: '2', category: 'Tech', merchant: 'Amazon', icon: 'shopping-cart', date: 'Jul 24, 2025', amount: -34.99 },
  { id: '3', category: 'Food', merchant: 'Whole Foods', icon: 'shopping-bag', date: 'Jul 23, 2025', amount: -78.50 },
  { id: '4', category: 'Lifestyle', merchant: 'Gym Membership', icon: 'activity', date: 'Jul 22, 2025', amount: -45.00 },
  { id: '5', category: 'Education', merchant: 'Coursera', icon: 'book', date: 'Jul 21, 2025', amount: -15.00 },
  { id: '6', category: 'Miscellaneous', merchant: 'Pharmacy', icon: 'plus-circle', date: 'Jul 20, 2025', amount: -12.75 },
  { id: '7', category: 'Food', merchant: 'Restaurant', icon: 'coffee', date: 'Jul 19, 2025', amount: -25.00 },
];

const categories = ['All', 'Food', 'Tech', 'Education', 'Lifestyle', 'Miscellaneous'];

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions = selectedCategory === 'All'
    ? transactionsData
    : transactionsData.filter(transaction => transaction.category === selectedCategory);

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

  const renderTransactionItem = ({ item }: { item: typeof transactionsData[0] }) => (
    <ThemedView style={[styles.transactionCard, { shadowColor: Colors[colorScheme ?? 'light'].text }]}>
      <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <Feather name={item.icon as any} size={20} color={Colors[colorScheme ?? 'light'].icon} />
      </View>
      <View style={styles.transactionDetails}>
        <ThemedText style={styles.transactionMerchant}>{item.merchant}</ThemedText>
        <ThemedText style={styles.transactionDate}>{item.date}</ThemedText>
      </View>
      <ThemedText style={styles.transactionAmount}>${item.amount.toFixed(2)}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Transaction History</ThemedText>
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
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
