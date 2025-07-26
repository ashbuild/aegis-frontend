import React, { useState, useEffect } from 'react';
import { View, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { apiService, type Transaction } from '@/services/api';

export default function TransactionsWidget() {
  const colorScheme = useColorScheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await apiService.getTransactions();
      setTransactions(data.slice(0, 3)); // Show only first 3 for widget
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days ago`;
    }
  };

  const cardStyle = {
    backgroundColor: Colors[colorScheme ?? 'light'].card,
    shadowColor: Colors[colorScheme ?? 'light'].text,
  };

  const handlePress = () => {
    router.push('/(tabs)/history');
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Recent Transactions</ThemedText>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <ThemedView style={[styles.card, cardStyle]}>
          {loading ? (
            <ThemedText style={styles.loadingText}>Loading transactions...</ThemedText>
          ) : (
            transactions.map((tx, index) => (
              <View key={tx.id} style={[styles.transactionRow, index === transactions.length - 1 && styles.lastRow]}>
                <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
                  <Feather name={tx.icon as any} size={20} color={Colors[colorScheme ?? 'light'].icon} />
                </View>
                <View style={styles.transactionDetails}>
                  <ThemedText style={styles.merchantText}>{tx.merchant}</ThemedText>
                  <ThemedText style={styles.timeText}>{formatDate(tx.date)}</ThemedText>
                </View>
                <ThemedText style={[styles.amountText, { color: tx.amount < 0 ? '#F44336' : '#4CAF50' }]}>
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </ThemedText>
              </View>
            ))
          )}
        </ThemedView>
      </TouchableOpacity>
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
  loadingText: {
    textAlign: 'center',
    color: '#999',
    paddingVertical: 20,
    fontFamily: 'Poppins',
  },
});
