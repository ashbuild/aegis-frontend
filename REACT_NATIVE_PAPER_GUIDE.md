# React Native Paper Integration Guide

## Overview

React Native Paper has been successfully integrated into your Aegis frontend project. This guide explains how to use the Paper components and the integration with your existing design system.

## What's Included

### Core Dependencies
- `react-native-paper`: Material Design 3 components for React Native
- Integrated with Expo for seamless compatibility

### Theme Integration
- **PaperTheme.ts**: Custom themes that integrate with your existing design system
- **Light and Dark themes**: Automatically mapped from your existing Colors.ts
- **Material Design 3**: Full MD3 color system support

### Components Created

#### 1. PaperButton (`components/ui/PaperButton.tsx`)
A wrapper around React Native Paper's Button that maintains your existing API:

```tsx
import { PaperButton } from '@/components/ui';

<PaperButton
  title="Click Me"
  variant="primary" // primary | secondary | ghost
  size="medium"     // small | medium | large
  loading={false}
  onPress={() => {}}
/>
```

#### 2. PaperCard (`components/ui/PaperCard.tsx`)
Enhanced card component with Material Design elevation:

```tsx
import { PaperCard } from '@/components/ui';

<PaperCard elevated={true} onPress={() => {}}>
  <Text>Card content</Text>
</PaperCard>
```

#### 3. PaperFAB (`components/ui/PaperFAB.tsx`)
Material Design Floating Action Button:

```tsx
import { PaperFAB } from '@/components/ui';

<PaperFAB
  icon="plus"
  size="medium"
  variant="primary"
  onPress={() => {}}
/>
```

#### 4. PaperTextInput (`components/ui/PaperTextInput.tsx`)
Enhanced text input with Material Design styling:

```tsx
import { PaperTextInput } from '@/components/ui';

<PaperTextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  mode="outlined"
  error={hasError}
  keyboardType="email-address"
/>
```

### Example Implementation

See `app/paper-login.tsx` for a complete example showing:
- Form layout with Paper components
- Theme integration
- Error handling
- Material Design best practices

## Using React Native Paper Components

### Direct Paper Components
You can use any React Native Paper component directly:

```tsx
import { Button, Card, Text, Surface } from 'react-native-paper';

function MyComponent() {
  return (
    <Surface elevation={4}>
      <Card>
        <Card.Content>
          <Text variant="headlineSmall">Title</Text>
          <Text variant="bodyMedium">Content</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="text">Cancel</Button>
          <Button mode="contained">Save</Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
}
```

### Available Paper Components
- **Buttons**: Button, FAB, IconButton, ToggleButton
- **Cards**: Card with actions, content, cover
- **Data Display**: Avatar, Badge, Chip, Divider
- **Inputs**: TextInput, Searchbar, Switch, Checkbox, RadioButton
- **Layout**: Surface, Drawer, Appbar, BottomNavigation
- **Feedback**: Dialog, Snackbar, Banner, ActivityIndicator
- **Typography**: Text with variants (headline, body, label, etc.)

## Theme Usage

The Paper theme is automatically applied through the PaperProvider in your app layout. To access theme values:

```tsx
import { useTheme } from 'react-native-paper';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.surface }}>
      <Text style={{ color: theme.colors.onSurface }}>
        Themed text
      </Text>
    </View>
  );
}
```

## Migration Strategy

### Gradual Migration
1. **Keep existing components**: Your original Button, Card, etc. components are still available
2. **Use Paper for new features**: Start using Paper components for new screens/features
3. **Migrate piece by piece**: Gradually replace custom components with Paper versions

### Component Mapping
- `Button` → `PaperButton` or `Button` from react-native-paper
- `Card` → `PaperCard` or `Card` from react-native-paper
- `FAB` → `PaperFAB` or `FAB` from react-native-paper
- Custom TextInput → `TextInput` from react-native-paper

## Design System Benefits

### Material Design 3
- **Consistent**: Following Google's Material Design guidelines
- **Accessible**: Built-in accessibility features
- **Theming**: Advanced theming system with dynamic colors
- **Responsive**: Adapts to different screen sizes and orientations

### Enhanced UX
- **Touch feedback**: Ripple effects and proper touch states
- **Elevation**: Proper shadows and depth
- **Animation**: Smooth transitions and micro-interactions
- **Typography**: Material Design typography scale

## Best Practices

### 1. Use Paper's Typography System
```tsx
import { Text } from 'react-native-paper';

<Text variant="headlineLarge">Main Title</Text>
<Text variant="bodyMedium">Body text</Text>
<Text variant="labelSmall">Small label</Text>
```

### 2. Leverage Surface for Elevation
```tsx
import { Surface } from 'react-native-paper';

<Surface elevation={2} style={{ borderRadius: 8 }}>
  <YourContent />
</Surface>
```

### 3. Use Proper Icon Integration
```tsx
import { IconButton } from 'react-native-paper';

<IconButton icon="heart" size={24} onPress={() => {}} />
```

### 4. Form Best Practices
```tsx
<TextInput
  label="Required Field"
  value={value}
  onChangeText={setValue}
  error={hasError}
  mode="outlined"
  left={<TextInput.Icon icon="account" />}
  right={<TextInput.Affix text="/100" />}
/>
```

## Next Steps

1. **Explore the example**: Check out `app/paper-login.tsx` to see Paper in action
2. **Start small**: Use Paper components for your next new feature
3. **Read the docs**: Visit [React Native Paper documentation](https://reactnativepaper.com/)
4. **Customize**: Extend the theme in `constants/PaperTheme.ts` as needed

## Troubleshooting

### Common Issues
1. **Icons not showing**: Make sure you're using valid Material Design icon names
2. **Theme not applying**: Ensure PaperProvider wraps your app in `_layout.tsx`
3. **TypeScript errors**: Import types from 'react-native-paper' when needed

### Getting Help
- React Native Paper docs: https://reactnativepaper.com/
- Material Design 3: https://m3.material.io/
- Expo integration: https://docs.expo.dev/guides/using-react-native-paper/
