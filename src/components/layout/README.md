# Layout Components

This directory contains the core layout components for the QuickNote application.

## Components

### DashboardLayout

The main layout wrapper that combines the Sidebar and Header components. Use this for all authenticated pages.

**Usage:**

```tsx
import { DashboardLayout } from '@/components/layout';

export default function MyPage() {
  return (
    <DashboardLayout
      title="My Page Title"
      actions={
        <Button variant="primary">
          <span className="material-symbols-outlined">add</span>
          New Item
        </Button>
      }
    >
      {/* Your page content here */}
      <div>Page content goes here</div>
    </DashboardLayout>
  );
}
```

**Props:**

- `children` (required): The page content
- `title` (optional): Page title displayed in the title bar
- `actions` (optional): Action buttons displayed in the title bar
- `showSearch` (optional, default: true): Show/hide the search bar
- `showNotifications` (optional, default: true): Show/hide notifications
- `showThemeToggle` (optional, default: true): Show/hide theme toggle
- `loading` (optional, default: false): Show loading spinner instead of content

### Sidebar

Navigation sidebar with collapsible functionality and responsive behavior.

**Features:**

- Collapsible on desktop (icon-only mode)
- Overlay mode on mobile with hamburger menu
- Active state highlighting
- User profile section at top
- Settings link at bottom
- Keyboard navigation support (Escape to close on mobile)

**Usage:**

```tsx
import { Sidebar } from '@/components/layout';

<Sidebar currentProfile={currentProfile} />
```

### Header

Top header bar with search, notifications, theme toggle, and profile dropdown.

**Features:**

- Search bar with keyboard shortcut (Cmd/Ctrl + K)
- Notifications dropdown (placeholder)
- Theme toggle button
- Profile dropdown menu
- Sticky positioning
- Keyboard navigation support (Escape to close dropdowns)

**Usage:**

```tsx
import { Header } from '@/components/layout';

<Header
  currentProfile={currentProfile}
  showSearch={true}
  showNotifications={true}
  showThemeToggle={true}
/>
```

## Responsive Behavior

### Mobile (< 768px)

- Sidebar hidden by default, accessible via hamburger menu
- Sidebar appears as overlay when opened
- Search bar takes full width
- Profile name hidden, only avatar shown

### Tablet (768px - 1024px)

- Sidebar persistent
- All features visible

### Desktop (> 1024px)

- Sidebar persistent with collapse functionality
- All features visible
- Hover states enabled

## Keyboard Shortcuts

- `Cmd/Ctrl + K`: Focus search bar
- `Escape`: Close mobile sidebar, close dropdowns, blur search

## Profile Data

The layout components expect profile data in the following format:

```typescript
interface Profile {
  id: string;
  name: string;
  avatar: string; // Emoji or initials
  avatarBg: string; // Hex color
}
```

Profile data is automatically loaded from `localStorage` with key `currentProfile`.

## Navigation Items

The sidebar includes the following navigation items:

- Home (Dashboard)
- Notes
- Flashcards
- Quizzes
- Folders

To modify navigation items, edit the `navItems` array in `Sidebar.tsx`.

## Styling

All components use Tailwind CSS with custom design tokens:

- Colors: `text-primary`, `text-secondary`, `text-tertiary`, `bg-surface`, `bg-background`, etc.
- Spacing: Standard Tailwind spacing scale
- Transitions: 150ms for interactions, 300ms for layout changes
- Icons: Material Symbols Outlined

## Accessibility

- Semantic HTML elements
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
