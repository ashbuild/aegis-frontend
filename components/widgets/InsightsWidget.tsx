import React from 'react';
import { View, Text, StyleSheet, FlatList, useColorScheme } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

const insights = [
  { id: '1', text: "Your spending on 'Eating Out' is up 30% this month.", color: Colors.light.warning },
  { id: '2', text: 'You have a new bill due soon: Electricity - $75', color: Colors.light.tint },
  { id: '3', text: 'Your grocery spending is down 15% from last month.', color: Colors.light.success },
];

export default function InsightsWidget() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>Insights</ThemedText>
      <FlatList
        data={insights}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedView style={[
            styles.widget,
            { backgroundColor: item.color, shadowColor: Colors[colorScheme ?? 'light'].text }
          ]}>
            <Text style={styles.widgetText}>{item.text}</Text>
          </ThemedView>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingLeft: 16,
  },
  widget: {
    width: 280,
    height: 120,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    marginRight: 16,
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  widgetText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: 'Poppins-Bold',
  },
});
