# Theme System

This directory contains the theme context and provider for QuickNote's dark mode support.

## Usage

The `ThemeProvider` is already integrated into the root layout (`src/app/layout.tsx`), so all pages automatically have access to the theme context.

### Using the Theme Hook

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('light')}>Set Light</button>
    </div>
  );
}
```

### Theme Toggle Component

A pre-built `ThemeToggle` component is available at `src/components/ThemeToggle.tsx`:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  );
}
```

## Features

- **System Theme Detection**: Automatically detects the user's system theme preference on initial load
- **LocalStorage Persistence**: Saves the user's theme preference and restores it on subsequent visits
- **Smooth Transitions**: All color changes animate smoothly (150ms ease-in-out)
- **No Flash**: Prevents flash of unstyled content on page load
- **System Theme Sync**: Listens for system theme changes and updates automatically (if user hasn't set a preference)

## Theme Colors

All theme colors are defined as CSS variables in `src/app/globals.css` and can be used via Tailwind classes:

### Light Theme
- `bg-background` - #f6f7f8
- `bg-surface` - #ffffff
- `text-text-primary` - #0d141b
- `text-text-secondary` - #4c739a
- `bg-primary` - #2b8cee

### Dark Theme
- `bg-background` - #0f172a
- `bg-surface` - #1e293b
- `text-text-primary` - #ffffff
- `text-text-secondary` - #9cb3c9
- `bg-primary` - #3b82f6

## Implementation Details

The theme system uses:
1. React Context for state management
2. CSS classes (`.dark`) for theme switching
3. CSS variables for color values
4. Tailwind CSS for styling
5. LocalStorage for persistence
6. `prefers-color-scheme` media query for system detection
