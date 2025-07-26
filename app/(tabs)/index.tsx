import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import InsightsWidget from '@/components/widgets/InsightsWidget';
import TransactionsWidget from '@/components/widgets/TransactionsWidget';
import IntelligentHubsWidget from '@/components/widgets/IntelligentHubsWidget';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <InsightsWidget />
        <TransactionsWidget />
        <IntelligentHubsWidget />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
});
