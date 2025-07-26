# Aegis Design System

A comprehensive design system for the Aegis financial app, built with React Native and Expo. This design system provides a consistent, accessible, and modern user experience across both light and dark themes.

## 🎨 Design Philosophy

The Aegis design system is built around the principles of:
- **Trust & Security**: Professional, clean aesthetics that convey reliability
- **Clarity**: Clear information hierarchy and readable typography
- **Accessibility**: Inclusive design that works for all users
- **Consistency**: Systematic approach to colors, spacing, and interactions

## 🌈 Color System

### Dual-Theme Support
The design system supports both Light and Dark modes from the ground up:

#### Light Mode Colors
- **Background Primary**: `#F3F4F6` (Cool Gray)
- **Background Surface**: `#FFFFFF` (White)
- **Text Primary**: `#1F2937` (Dark Gray)
- **Text Secondary**: `#6B7280` (Medium Gray)
- **Action Primary**: `#14B8A6` (Teal)

#### Dark Mode Colors
- **Background Primary**: `#111827` (Dark Slate)
- **Background Surface**: `#1F2937` (Dark Gray)
- **Text Primary**: `#F9FAFB` (Off-White)
- **Text Secondary**: `#9CA3AF` (Light Gray)
- **Action Primary**: `#2DD4BF` (Bright Teal)

### Semantic Colors
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)

## 📝 Typography

### Font Family
- **Primary**: Inter (preferred)
- **Fallback**: Poppins

### Type Scale
- **H1**: 30pt Bold (Headers)
- **H2**: 24pt Bold (Section titles)
- **H3**: 20pt SemiBold (Subsections)
- **H4**: 18pt SemiBold (Card titles)
- **Body**: 16pt Regular (Primary text)
- **Body Small**: 14pt Regular (Secondary text)
- **Caption**: 12pt Regular (Labels, hints)

## 📏 Spacing System

Built on an **8pt grid system** for consistent, harmonious layouts:

- **XS**: 4pt (0.5 grid units)
- **SM**: 8pt (1 grid unit)
- **MD**: 16pt (2 grid units)
- **LG**: 24pt (3 grid units)
- **XL**: 32pt (4 grid units)
- **XXL**: 40pt (5 grid units)

### Component Spacing
- **Touch Targets**: Minimum 44x44pt
- **Card Padding**: 16pt
- **Border Radius**: 4pt, 8pt, 12pt, 16pt
- **Icon Sizes**: 16pt, 24pt, 32pt, 40pt

## 🎭 Animations & Microinteractions

### Timing
- **Fast**: 150ms (Quick feedback)
- **Normal**: 250ms (State changes)
- **Slow**: 350ms (Page transitions)

### Easing
- **Ease In Out**: Standard interactions
- **Bounce**: Playful elements (FAB, buttons)
- **Spring**: Natural motion

### Key Animations
- **Button Press**: Scale to 95% with spring back
- **List Items**: Staggered fade-in from right
- **Charts**: Progressive drawing animation
- **FAB**: Rotation on press (+45°)

## ♿ Accessibility Features

### Screen Reader Support
- Comprehensive accessibility labels for all interactive elements
- Proper semantic roles (button, header, navigation, etc.)
- Descriptive hints for complex interactions

### Dynamic Type
- Supports iOS Dynamic Type and Android font scaling
- Automatic font size scaling based on user preferences
- Bold text support for users with vision needs

### Color Contrast
- All color combinations meet WCAG AA standards
- High contrast ratios for text readability
- Semantic colors work in both light and dark themes

### Touch Targets
- Minimum 44x44pt touch targets
- Adequate spacing between interactive elements
- Clear focus indicators

## 🧩 Components

### Core Components

#### Button
```tsx
<Button
  title="Primary Action"
  variant="primary" // primary | secondary | ghost
  size="medium" // small | medium | large
  loading={false}
  disabled={false}
  onPress={() => {}}
/>
```

#### Card
```tsx
<Card
  elevation="medium" // none | low | medium | high
  glassmorphism={false}
  animateOnMount={true}
>
  <Text>Card content</Text>
</Card>
```

#### FAB (Floating Action Button)
```tsx
<FAB
  icon="plus"
  size="large" // small | medium | large
  variant="primary" // primary | secondary
  rotateOnPress={true}
  onPress={() => {}}
/>
```

### Enhanced Components

#### ThemedText
```tsx
<ThemedText
  type="h1" // h1 | h2 | h3 | h4 | body | bodySmall | caption
  colorToken="text-primary" // Any color token
  accessibilityRole="header"
>
  Themed Text
</ThemedText>
```

#### ThemedView
```tsx
<ThemedView
  backgroundToken="background-surface"
  spacing="paddingMedium"
  accessible={true}
>
  <Text>Content</Text>
</ThemedView>
```

## 🎯 Usage Examples

### Creating a Themed Screen
```tsx
import { useDesignTheme } from '@/hooks/useDesignTheme';
import { ThemedView, ThemedText } from '@/components';
import { Button, Card } from '@/components/ui';

function MyScreen() {
  const { colors, spacing } = useDesignTheme();
  
  return (
    <ThemedView backgroundToken="background-primary">
      <Card elevation="medium">
        <ThemedText type="h2">Welcome</ThemedText>
        <Button title="Get Started" variant="primary" />
      </Card>
    </ThemedView>
  );
}
```

### Using Design Tokens
```tsx
import { Colors, Spacing, Typography } from '@/constants/DesignSystem';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    backgroundColor: Colors.light['background-primary'],
  },
  title: {
    ...Typography.textStyles.h1,
    marginBottom: Spacing.lg,
  },
});
```

## 🛠 Development

### File Structure
```
constants/
├── DesignSystem.ts      # Main export
├── Colors.ts            # Color tokens
├── Typography.ts        # Type scale & fonts
├── Spacing.ts          # Spacing system
├── Animations.ts       # Animation presets
└── Accessibility.ts    # A11y helpers

components/
├── ui/                 # Design system components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── FAB.tsx
│   └── index.ts
├── ThemedText.tsx      # Enhanced text component
└── ThemedView.tsx      # Enhanced view component

hooks/
├── useDesignTheme.ts   # Main theme hook
├── useDynamicType.ts   # Accessibility support
└── useColorScheme.ts   # Theme switching
```

### Adding New Components

1. **Follow Design Tokens**: Use color tokens, spacing values, and typography styles from the design system
2. **Include Accessibility**: Add proper labels, roles, and dynamic type support
3. **Support Animations**: Include appropriate microinteractions
4. **Theme Awareness**: Support both light and dark modes

### Best Practices

- Always use design tokens instead of hardcoded values
- Include accessibility props for all interactive elements
- Test with both light and dark themes
- Verify contrast ratios meet WCAG standards
- Support dynamic type scaling
- Use semantic color tokens (e.g., 'action-primary' vs hex codes)

## 📱 Platform Support

- **iOS**: Full support including Dynamic Type and bold text preferences
- **Android**: Font scaling and accessibility services integration
- **Web**: Responsive design with proper semantic HTML

## 🚀 Performance

- **Optimized Animations**: Use native driver where possible
- **Lazy Loading**: Components load as needed
- **Efficient Re-renders**: Proper memoization of theme values
- **Bundle Size**: Tree-shakeable exports

---

**Built with ❤️ for the Aegis financial app**
