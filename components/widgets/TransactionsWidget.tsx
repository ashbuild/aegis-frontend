import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const transactions = [
  { id: '1', merchant: 'Starbucks', icon: 'coffee', amount: -12.50, time: '9:30 AM' },
  { id: '2', merchant: 'Amazon', icon: 'shopping-cart', amount: -54.99, time: 'Yesterday' },
  { id: '3', merchant: 'Shell', icon: 'truck', amount: -45.30, time: '2 days ago' },
];

export default function TransactionsWidget() {
  const colorScheme = useColorScheme();
  const cardStyle = {
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    shadowColor: Colors[colorScheme ?? 'light'].text,
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Recent Transactions</ThemedText>
      <ThemedView style={[styles.card, cardStyle]}>
        {transactions.map((tx, index) => (
          <View key={tx.id} style={[styles.transactionRow, index === transactions.length - 1 && styles.lastRow]}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
              <Feather name={tx.icon as any} size={20} color={Colors[colorScheme ?? 'light'].icon} />
            </View>
            <View style={styles.transactionDetails}>
              <ThemedText style={styles.merchantText}>{tx.merchant}</ThemedText>
              <ThemedText style={styles.timeText}>{tx.time}</ThemedText>
            </View>
            <ThemedText style={styles.amountText}>${tx.amount.toFixed(2)}</ThemedText>
          </View>
        ))}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 12,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  lastRow: {
    borderBottomWidth: 0,
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
  merchantText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  timeText: {
    fontSize: 12,
    color: '#9E9E9E',
    fontFamily: 'Poppins',
  },
  amountText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
