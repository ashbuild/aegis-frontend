import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Alert } from 'react-native';
import { 
  Text,
  Card,
  Button,
  TextInput,
  Surface,
  useTheme,
  ActivityIndicator,
  Badge
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/DesignSystem';
import { apiService, type GroceryItem } from '@/services/api';
import { BarChart } from 'react-native-chart-kit';

export default function KitchenIQScreen() {
  const theme = useTheme();
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Surface style={styles.headerSurface} elevation={1}>
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            KitchenIQ
          </Text>
        </Surface>

        {/* What's New & What to Use First */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="What's New & What to Use First"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading your grocery items...
                </Text>
              </View>
            ) : (
              getItemsByPriority().map((item) => (
                <View key={item.id} style={styles.groceryItem}>
                  <View style={styles.itemInfo}>
                    <Text variant="bodyLarge" style={styles.itemName}>
                      {item.name}
                    </Text>
                    <Text 
                      variant="bodySmall" 
                      style={[styles.itemExpiry, { color: theme.colors.onSurfaceVariant }]}
                    >
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <Badge 
                    size={32}
                    style={[
                      styles.nutritionScore,
                      { 
                        backgroundColor: item.nutritionScore > 90 
                          ? '#4CAF50' 
                          : item.nutritionScore > 70 
                            ? '#FF9800' 
                            : '#F44336' 
                      }
                    ]}
                  >
                    {item.nutritionScore}
                  </Badge>
                </View>
              ))
            )}
          </Card.Content>
        </Card>

        {/* Nutrition Snapshot */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Nutrition Snapshot"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading || !nutritionData ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading nutrition data...
                </Text>
              </View>
            ) : (
              <>
                {nutritionData.highlights.map((highlight: string, index: number) => (
                  <Text 
                    key={index} 
                    variant="bodyMedium" 
                    style={[styles.highlight, { color: theme.colors.onSurface }]}
                  >
                    • {highlight}
                  </Text>
                ))}
                <View style={styles.nutritionGrid}>
                  <Surface style={styles.nutritionItem} elevation={1}>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                      Protein
                    </Text>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      {nutritionData.protein.value}g
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      of {nutritionData.protein.target}g
                    </Text>
                  </Surface>
                  <Surface style={styles.nutritionItem} elevation={1}>
                    <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                      Carbs
                    </Text>
                    <Text variant="headlineSmall" style={{ color: theme.colors.primary }}>
                      {nutritionData.carbs.value}g
                    </Text>
                    <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                      of {nutritionData.carbs.target}g
                    </Text>
                  </Surface>
                </View>
              </>
            )}
          </Card.Content>
        </Card>

        {/* Recipe on Demand */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Recipe on Demand"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            <Text 
              variant="bodyMedium" 
              style={[styles.recipeDescription, { color: theme.colors.onSurfaceVariant }]}
            >
              Tell us what you want to make or list your ingredients
            </Text>
            <TextInput
              mode="outlined"
              placeholder="e.g., chicken, broccoli, pasta..."
              value={recipeInput}
              onChangeText={setRecipeInput}
              multiline
              numberOfLines={3}
              style={styles.recipeInput}
            />
            <Button
              mode="contained"
              onPress={handleGenerateRecipe}
              style={styles.generateButton}
              contentStyle={styles.generateButtonContent}
            >
              Generate Recipe
            </Button>
          </Card.Content>
        </Card>

        {/* Calorie Chart */}
        <Card style={styles.card} mode="elevated">
          <Card.Title 
            title="Weekly Calorie Chart"
            titleVariant="titleLarge"
            titleStyle={{ color: theme.colors.onSurface }}
          />
          <Card.Content>
            {loading || !calorieData ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" />
                <Text variant="bodyMedium" style={{ marginTop: 8 }}>
                  Loading calorie distribution...
                </Text>
              </View>
            ) : (
              <BarChart
                data={calorieData}
                width={screenWidth - 64}
                height={220}
                yAxisLabel=""
                yAxisSuffix="cal"
                chartConfig={{
                  backgroundColor: theme.colors.surface,
                  backgroundGradientFrom: theme.colors.surface,
                  backgroundGradientTo: theme.colors.surface,
                  decimalPlaces: 0,
                  color: (opacity = 1) => theme.colors.primary + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                  labelColor: (opacity = 1) => theme.colors.onSurface + Math.round(opacity * 255).toString(16).padStart(2, '0'),
                }}
                style={styles.chart}
              />
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
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
  },
  headerSurface: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: Spacing.lg,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: Spacing.lg,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
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
    marginTop: 2,
  },
  nutritionScore: {
    alignSelf: 'center',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  nutritionItem: {
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 8,
    flex: 1,
  },
  recipeDescription: {
    marginBottom: Spacing.md,
  },
  recipeInput: {
    marginBottom: Spacing.md,
  },
  generateButton: {
    marginTop: Spacing.sm,
  },
  generateButtonContent: {
    paddingVertical: 8,
  },
  chart: {
    marginVertical: Spacing.sm,
    borderRadius: 8,
  },
});
