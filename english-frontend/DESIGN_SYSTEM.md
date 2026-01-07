# Design System & Layout Architecture

## Overview
This document outlines the global design system, component library, and nested layout structure for the English Learning App.

---

## Design Tokens

### Colors
```javascript
colors = {
  primary: '#0FA3B1',      // Teal - Primary brand color
  secondary: '#FFC857',    // Gold/Amber - Secondary accent
  accent: '#F65C6C',       // Rose/Red - Error/Alert states
  background: '#F7FBFF',   // Light blue background
  text: {
    primary: '#123047',    // Dark blue - Main text
    secondary: '#666666',  // Gray - Secondary text
    light: '#FFFFFF',      // White - Light text
  },
  border: '#E0E0E0',       // Light gray borders
  success: '#10B981',      // Green - Success states
  warning: '#F59E0B',      // Orange - Warning states
  error: '#EF4444',        // Red - Error states
}
```

### Typography
```javascript
typography = {
  fontFamily: {
    base: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  sizes: {
    h1: { fontSize: '32px', fontWeight: 700, lineHeight: '1.2' },      // Page titles
    h2: { fontSize: '24px', fontWeight: 700, lineHeight: '1.3' },      // Section headings
    h3: { fontSize: '20px', fontWeight: 600, lineHeight: '1.4' },      // Subsection headings
    body: { fontSize: '16px', fontWeight: 400, lineHeight: '1.5' },    // Body text
    small: { fontSize: '14px', fontWeight: 400, lineHeight: '1.5' },   // Small text
    xs: { fontSize: '12px', fontWeight: 500, lineHeight: '1.4' },      // Extra small labels
  }
}
```

### Spacing Scale
```javascript
spacing = {
  xs: '4px',      // Extra small - padding in buttons
  sm: '8px',      // Small - gaps between elements
  md: '16px',     // Medium - default padding
  lg: '24px',     // Large - section margins
  xl: '32px',     // Extra large - page margins
  xxl: '48px',    // Double extra large - top spacing
}
```

### Border Radius
```javascript
borderRadius = {
  sm: '4px',      // Small radius for inputs
  md: '8px',      // Medium radius for buttons
  lg: '12px',     // Large radius for cards
  xl: '16px',     // Extra large for big components
  full: '9999px', // Circular for avatar/badges
}
```

### Shadows
```javascript
shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',      // Subtle shadow
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',       // Medium shadow
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',     // Large shadow
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',     // Extra large shadow
}
```

---

## Shared Components

### 1. PrimaryButton
Primary call-to-action button with multiple variants.

**Location**: `src/components/shared/PrimaryButton.jsx`

**Variants**: `primary`, `secondary`, `accent`, `outline`
**Sizes**: `sm`, `md`, `lg`

```javascript
import PrimaryButton from '@/components/shared/PrimaryButton'

// Basic usage
<PrimaryButton>Click me</PrimaryButton>

// With variants
<PrimaryButton variant="secondary">Secondary</PrimaryButton>
<PrimaryButton variant="accent">Accent</PrimaryButton>
<PrimaryButton variant="outline">Outline</PrimaryButton>

// With sizes
<PrimaryButton size="sm">Small</PrimaryButton>
<PrimaryButton size="lg">Large</PrimaryButton>

// Full width
<PrimaryButton fullWidth>Full Width</PrimaryButton>

// Disabled
<PrimaryButton disabled>Disabled</PrimaryButton>
```

### 2. Card
Reusable card component for content containers.

**Location**: `src/components/shared/Card.jsx`

**Variants**: `default`, `elevated`, `bordered`

```javascript
import Card from '@/components/shared/Card'

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>

// Elevated card (more shadow)
<Card variant="elevated">
  <p>Elevated content</p>
</Card>

// Bordered card (primary color border)
<Card variant="bordered">
  <p>Bordered content</p>
</Card>

// Hoverable card
<Card hover={true}>
  <p>Click me!</p>
</Card>
```

### 3. PageHeader
Standard page header with title, subtitle, and optional action.

**Location**: `src/components/shared/PageHeader.jsx`

```javascript
import PageHeader from '@/components/shared/PageHeader'
import PrimaryButton from '@/components/shared/PrimaryButton'

// Basic header
<PageHeader title="Dashboard" />

// With subtitle
<PageHeader 
  title="My Courses" 
  subtitle="Manage your learning materials"
/>

// With action
<PageHeader 
  title="Lessons" 
  subtitle="All available lessons"
  action={<PrimaryButton>Create Lesson</PrimaryButton>}
/>
```

---

## Layout System

### MainLayout
Global layout wrapper that includes the top navbar on all pages.

**Location**: `src/layouts/MainLayout.jsx`

**Features**:
- Persistent top navbar (logo, search, main menu, logout)
- Consistent colors and fonts across all pages
- No sidebar (learner-facing pages)

**Routes using MainLayout**:
- `/` (Home)
- `/lessons`
- `/dashboard` (Learner Dashboard)
- `/grammar-hub`
- `/class`
- `/modules/*`

**NavBar Components**:
- Logo (EC gradient)
- Search bar
- Navigation menu (Home, Tutor Dashboard, Grammar Hub, Teach)
- Logout button

**Example Usage**:
```javascript
// In App.jsx - routes wrapped with MainLayout
<Route element={<MainLayout />}>
  <Route path='/' element={<Home />} />
  <Route path='/lessons' element={<Lessons />} />
  <Route path='/grammar-hub' element={<GrammarHubDashboard />} />
  {/* More routes... */}
</Route>
```

### TutorLayout
Specialized layout for tutor/admin pages with sidebar navigation.

**Location**: `src/layouts/TutorLayout.jsx`

**Features**:
- Inherits MainLayout (has top navbar)
- Left sidebar with collapsible navigation
- Tutor-specific menu items (Dashboard, My Classes, Lessons & Quizzes, Resources, Students, Settings)
- Persistent sidebar state

**Routes using TutorLayout**:
- `/tutor/dashboard`
- `/tutor/classes`
- `/tutor/lessons-quizzes`
- `/tutor/resources`
- `/tutor/students`
- `/tutor/settings`

**Sidebar Navigation Items**:
```javascript
📊 Dashboard
🧑‍🏫 My Classes
📚 Lessons & Quizzes
🗂️ Resources
👨‍🎓 Students
⚙️ Settings
```

**Example Usage**:
```javascript
// In App.jsx - tutor routes wrapped with TutorLayout
<Route element={<TutorLayout />}>
  <Route path='/tutor/dashboard' element={<TutorDashboardHome />} />
  <Route path='/tutor/classes' element={<TutorClasses />} />
  {/* More routes... */}
</Route>
```

---

## Routing Structure

### Complete Route Hierarchy

```
App
├── Auth Routes (no layout)
│   ├── /login
│   ├── /register
│   ├── /forgot-password
│   └── /reset-password
│
├── Admin Routes (no layout)
│   └── /admin-dashboard
│
├── Content Provider Routes (no layout)
│   ├── /content-provider
│   ├── /content-provider/create-course
│   └── ...
│
├── MainLayout (top navbar only)
│   ├── / (Home)
│   ├── /lessons
│   ├── /dashboard (Learner Dashboard)
│   ├── /class
│   ├── /grammar-hub
│   └── /modules/*
│
└── TutorLayout (navbar + sidebar)
    ├── /tutor/dashboard
    ├── /tutor/classes
    ├── /tutor/lessons-quizzes
    ├── /tutor/resources
    ├── /tutor/students
    └── /tutor/settings
```

---

## Using Design Tokens in Components

### Importing Tokens
```javascript
import { colors, typography, spacing, borderRadius, shadows } from '@/theme/designTokens'

// In your component
const MyComponent = () => {
  const headerStyle = {
    color: colors.text.primary,
    fontSize: typography.sizes.h2.fontSize,
    fontWeight: typography.sizes.h2.fontWeight,
    marginBottom: spacing.lg,
  }

  const cardStyle = {
    backgroundColor: colors.text.light,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    boxShadow: shadows.sm,
  }

  return (
    <div style={cardStyle}>
      <h2 style={headerStyle}>My Heading</h2>
    </div>
  )
}
```

---

## Component Best Practices

### 1. Always Use Design Tokens
```javascript
// ❌ Don't
<div style={{ color: '#123047', fontSize: '24px', padding: '16px' }}>
  Content
</div>

// ✅ Do
<div style={{
  color: colors.text.primary,
  ...typography.sizes.h2,
  padding: spacing.md
}}>
  Content
</div>
```

### 2. Use Semantic Color Names
```javascript
// ❌ Don't use hex codes directly
<button style={{ backgroundColor: '#F65C6C' }}>Delete</button>

// ✅ Do use semantic names
<button style={{ backgroundColor: colors.accent }}>Delete</button>
```

### 3. Create Custom Components for Reusability
```javascript
// ✅ Create reusable styled components
const StyledCard = ({ children, ...props }) => (
  <Card style={{ backgroundColor: colors.background }} {...props}>
    {children}
  </Card>
)

// Then use everywhere
<StyledCard>My Content</StyledCard>
```

---

## Migration Guide

### For Existing Pages

#### Step 1: Import Design Tokens
```javascript
import { colors, typography, spacing } from '@/theme/designTokens'
import PageHeader from '@/components/shared/PageHeader'
import Card from '@/components/shared/Card'
import PrimaryButton from '@/components/shared/PrimaryButton'
```

#### Step 2: Replace Hardcoded Colors
```javascript
// Before
<div style={{ color: '#123047', backgroundColor: '#F7FBFF' }}>

// After
<div style={{ color: colors.text.primary, backgroundColor: colors.background }}>
```

#### Step 3: Use Typography Tokens
```javascript
// Before
<h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Title</h1>

// After
<h1 style={{ ...typography.sizes.h1, fontFamily: typography.fontFamily.base }}>Title</h1>
```

#### Step 4: Update Spacing
```javascript
// Before
<div style={{ padding: '16px', marginBottom: '24px' }}>

// After
<div style={{ padding: spacing.md, marginBottom: spacing.lg }}>
```

#### Step 5: Use Shared Components
```javascript
// Before
<div style={{ border: '1px solid #E0E0E0', borderRadius: '12px', padding: '16px' }}>

// After
<Card>Content</Card>
```

---

## Consistency Checklist

- [ ] All colors use `colors` tokens
- [ ] All typography uses `typography` tokens
- [ ] All spacing uses `spacing` tokens
- [ ] All border radius uses `borderRadius` tokens
- [ ] All shadows use `shadows` tokens
- [ ] Buttons use `PrimaryButton` component
- [ ] Cards use `Card` component
- [ ] Page headers use `PageHeader` component
- [ ] Page-level routes are wrapped with appropriate Layout
- [ ] All components have consistent font family

---

## File Structure

```
src/
├── layouts/
│   ├── MainLayout.jsx         # Global layout with navbar
│   └── TutorLayout.jsx        # Tutor layout with sidebar
├── theme/
│   └── designTokens.js        # Design system tokens
├── components/
│   └── shared/
│       ├── PrimaryButton.jsx  # Shared button component
│       ├── Card.jsx           # Shared card component
│       └── PageHeader.jsx     # Shared header component
├── pages/
│   ├── Home.jsx
│   ├── GrammarHub/
│   ├── TutorDashboardHome.jsx
│   └── ...
└── App.jsx                    # Route definitions
```

---

## Color Usage Guidelines

| Component | Color | Rationale |
|-----------|-------|-----------|
| Primary buttons | `colors.primary` | Main CTAs |
| Links | `colors.primary` | Navigation |
| Page titles | `colors.text.primary` | Main content |
| Body text | `colors.text.secondary` | Supporting text |
| Borders | `colors.border` | Subtle separation |
| Success states | `colors.success` | Positive feedback |
| Warning states | `colors.warning` | Cautions |
| Error states | `colors.accent` | Negative feedback |
| Backgrounds | `colors.background` | Page backgrounds |

---

## Next Steps

1. ✅ Created MainLayout with global navbar
2. ✅ Created TutorLayout with sidebar
3. ✅ Created design tokens
4. ✅ Created shared components (PrimaryButton, Card, PageHeader)
5. ⏳ Update all existing pages to use design tokens
6. ⏳ Update existing components to use shared components
7. ⏳ Test all routes and layouts
8. ⏳ Document component variations and states
