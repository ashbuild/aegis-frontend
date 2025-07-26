import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Dimensions, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Card, Button } from '@/components/ui';
import { Spacing } from '@/constants/DesignSystem';
import { useDesignTheme } from '@/hooks/useDesignTheme';
import { apiService, type GroceryItem } from '@/services/api';
import { BarChart } from 'react-native-chart-kit';
import { Feather } from '@expo/vector-icons';

export default function KitchenIQScreen() {
  const { colors } = useDesignTheme();
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [calorieData, setCalorieData] = useState<any>(null);
  const [recipeInput, setRecipeInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [items, nutrition, calories] = await Promise.all([
        apiService.getGroceryItems(),
        apiService.getNutritionData(),
        apiService.getCalorieData(),
      ]);
      setGroceryItems(items);
      setNutritionData(nutrition);
      setCalorieData(calories);
    } catch (error) {
      console.error('Error loading KitchenIQ data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecipe = async () => {
    if (!recipeInput.trim()) {
      Alert.alert('Error', 'Please enter some ingredients or recipe preferences');
      return;
    }

    try {
      const ingredients = recipeInput.split(',').map(item => item.trim());
      // In mock mode, just show a success message
      Alert.alert(
        'Recipe Generated!', 
        `Great! Here's a recipe idea using: ${ingredients.join(', ')}. This feature will be enhanced with AI-powered recipe generation.`
      );
      setRecipeInput('');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate recipe. Please try again.');
    }
  };

  const getItemsByPriority = () => {
    return groceryItems
      .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
      .slice(0, 3);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="h1" style={styles.title}>KitchenIQ</ThemedText>

        {/* What's New & What to Use First */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>What's New & What to Use First</ThemedText>
          <View style={styles.cardContent}>
            {loading ? (
              <ThemedText type="body">Loading your grocery items...</ThemedText>
            ) : (
              getItemsByPriority().map((item) => (
                <View key={item.id} style={styles.groceryItem}>
                  <View style={styles.itemInfo}>
                    <ThemedText type="body" style={styles.itemName}>{item.name}</ThemedText>
                    <ThemedText type="caption" style={styles.itemExpiry}>
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </ThemedText>
                  </View>
                  <View style={[styles.nutritionScore, { backgroundColor: item.nutritionScore > 90 ? '#4CAF50' : item.nutritionScore > 70 ? '#FF9800' : '#F44336' }]}>
                    <ThemedText type="caption" style={styles.scoreText}>{item.nutritionScore}</ThemedText>
                  </View>
                </View>
              ))
            )}
          </View>
        </Card>

        {/* Nutrition Snapshot */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Nutrition Snapshot</ThemedText>
          <View style={styles.cardContent}>
            {loading || !nutritionData ? (
              <ThemedText type="body">Loading nutrition data...</ThemedText>
            ) : (
              <>
                {nutritionData.highlights.map((highlight: string, index: number) => (
                  <ThemedText key={index} type="body" style={styles.highlight}>• {highlight}</ThemedText>
                ))}
                <View style={styles.nutritionGrid}>
                  <View style={styles.nutritionItem}>
                    <ThemedText type="caption">Protein</ThemedText>
                    <ThemedText type="h4">{nutritionData.protein.value}g</ThemedText>
                    <ThemedText type="caption">of {nutritionData.protein.target}g</ThemedText>
                  </View>
                  <View style={styles.nutritionItem}>
                    <ThemedText type="caption">Carbs</ThemedText>
                    <ThemedText type="h4">{nutritionData.carbs.value}g</ThemedText>
                    <ThemedText type="caption">of {nutritionData.carbs.target}g</ThemedText>
                  </View>
                </View>
              </>
            )}
          </View>
        </Card>

        {/* Recipe on Demand */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Recipe on Demand</ThemedText>
          <View style={styles.cardContent}>
            <ThemedText type="body" style={styles.recipeDescription}>
              Tell us what you want to make or list your ingredients
            </ThemedText>
            <TextInput
              style={[styles.recipeInput, { backgroundColor: colors['background-surface'], color: colors['text-primary'] }]}
              placeholder="e.g., chicken, broccoli, pasta..."
              placeholderTextColor={colors['text-secondary']}
              value={recipeInput}
              onChangeText={setRecipeInput}
              multiline
            />
            <Button
              title="Generate Recipe"
              variant="primary"
              size="medium"
              onPress={handleGenerateRecipe}
              style={styles.generateButton}
            />
          </View>
        </Card>

        {/* Calorie Chart */}
        <Card elevation="medium" style={styles.card}>
          <ThemedText type="h3" style={styles.cardTitle}>Weekly Calorie Chart</ThemedText>
          <View style={styles.cardContent}>
            {loading || !calorieData ? (
              <ThemedText type="body">Loading calorie distribution...</ThemedText>
            ) : (
              <BarChart
                data={calorieData}
                width={screenWidth - 64}
                height={220}
                yAxisLabel=""
                yAxisSuffix="cal"
                chartConfig={{
                  backgroundColor: colors['background-surface'],
                  backgroundGradientFrom: colors['background-surface'],
                  backgroundGradientTo: colors['background-surface'],
                  decimalPlaces: 0,
                  color: (opacity = 1) => colors['action-primary'] + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  labelColor: (opacity = 1) => colors['text-primary'] + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                }}
                style={styles.chart}
              />
            )}
          </View>
        </Card>
      </ScrollView>
    </ThemedView>
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
    paddingTop: Spacing.xl,
  },
  title: {
    marginBottom: Spacing.xl,
  },
  card: {
    marginBottom: Spacing.lg,
    padding: Spacing.md,
  },
  cardTitle: {
    marginBottom: Spacing.sm,
  },
  cardContent: {
    marginTop: Spacing.sm,
  },
  highlight: {
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  groceryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
  },
  itemExpiry: {
    color: '#666',
    marginTop: 2,
  },
  nutritionScore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  recipeDescription: {
    marginBottom: Spacing.md,
    color: '#666',
  },
  recipeInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: Spacing.md,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
  },
  generateButton: {
    marginTop: Spacing.sm,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: 8,
  },
});
