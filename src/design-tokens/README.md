# Design Tokens

This directory contains the design system foundation for QuickNote.

## Files

- **colors.ts**: Color palette for light and dark themes
- **typography.ts**: Font family, sizes, weights, and line heights
- **spacing.ts**: Consistent spacing scale (4px to 96px)
- **borderRadius.ts**: Border radius values (6px to 24px)

## Usage

### In Tailwind Classes

The design tokens are integrated into Tailwind CSS and can be used directly:

```tsx
// Colors
<div className="bg-primary text-text-primary border-border">
  <p className="text-text-secondary">Secondary text</p>
</div>

// Typography
<h1 className="text-4xl font-bold leading-tight">Heading</h1>
<p className="text-base font-normal leading-normal">Body text</p>

// Spacing
<div className="p-6 m-4 space-y-3">Content</div>

// Border Radius
<div className="rounded-lg">Card</div>
<button className="rounded-md">Button</button>
```

### Dark Mode

Dark mode is enabled via the `dark` class on the root element:

```tsx
<html className="dark">
  {/* All colors automatically switch to dark theme */}
</html>
```

### Material Symbols Icons

Icons are loaded from Google Fonts and can be used with the class:

```tsx
<span className="material-symbols-outlined">home</span>
<span className="material-symbols-outlined">search</span>
<span className="material-symbols-outlined">settings</span>
```

## Design System Specifications

### Color Palette

**Light Theme:**
- Primary: #2b8cee (Blue)
- Background: #f6f7f8 (Light Gray)
- Surface: #ffffff (White)
- Text Primary: #0d141b (Dark)

**Dark Theme:**
- Primary: #3b82f6 (Lighter Blue)
- Background: #0f172a (Dark Blue)
- Surface: #1e293b (Dark Gray)
- Text Primary: #ffffff (White)

### Typography

- Font Family: Inter (400, 500, 600, 700)
- Base Size: 16px
- Scale: 12px to 48px

### Spacing Scale

4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

### Border Radius

6px (sm), 8px (md), 12px (lg), 16px (xl), 24px (2xl)
