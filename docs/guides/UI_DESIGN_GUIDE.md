# 🎨 EnglishClub LMS - UI/UX Design Guide

## Brand Identity

### Logo
- **Icon**: "EC" in gradient box
- **Gradient**: Teal (#0d9488) to Rose (#f43f5e)
- **Shape**: Rounded square (rounded-lg)
- **Size**: 40x40px standard

### Tagline
> "Learn • Teach • Explore"

---

## Color Palette

### Primary Colors
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Teal 600 | `#0d9488` | `teal-600` | Primary buttons, links |
| Cyan 500 | `#06b6d4` | `cyan-500` | Accents, gradients |
| Rose 500 | `#f43f5e` | `rose-500` | Alerts, highlights |

### Secondary Colors
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Slate 800 | `#1e293b` | `slate-800` | Dark backgrounds, text |
| Slate 600 | `#475569` | `slate-600` | Secondary text |
| Slate 100 | `#f1f5f9` | `slate-100` | Light backgrounds |

### Semantic Colors
| Name | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Emerald 500 | `#10b981` | `emerald-500` | Success |
| Amber 500 | `#f59e0b` | `amber-500` | Warning |
| Red 500 | `#ef4444` | `red-500` | Error |
| Blue 600 | `#2563eb` | `blue-600` | Info |

---

## Typography

### Font Family
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### Font Sizes
| Name | Size | Tailwind | Usage |
|------|------|----------|-------|
| XS | 12px | `text-xs` | Helper text, labels |
| SM | 14px | `text-sm` | Body text, buttons |
| Base | 16px | `text-base` | Default body |
| LG | 18px | `text-lg` | Subheadings |
| XL | 20px | `text-xl` | Headings |
| 2XL | 24px | `text-2xl` | Page titles |
| 3XL | 30px | `text-3xl` | Hero text |

### Font Weights
| Weight | Tailwind | Usage |
|--------|----------|-------|
| 400 | `font-normal` | Body text |
| 500 | `font-medium` | Links, labels |
| 600 | `font-semibold` | Buttons, nav |
| 700 | `font-bold` | Headings |

---

## Components

### Buttons

#### Primary Button
```html
<button class="px-5 py-2 rounded-full bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition">
  Button Text
</button>
```

#### Secondary Button
```html
<button class="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition">
  Button Text
</button>
```

#### Gradient Button
```html
<button class="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition">
  Button Text
</button>
```

#### Danger Button
```html
<button class="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition">
  Delete
</button>
```

---

### Cards

#### Basic Card
```html
<div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-100">
  <!-- Content -->
</div>
```

#### Stat Card
```html
<div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
  <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xl shadow-lg">
    📊
  </div>
  <div class="mt-4">
    <p class="text-sm font-medium text-slate-500">Label</p>
    <p class="text-3xl font-bold text-slate-800 mt-1">Value</p>
  </div>
</div>
```

#### Glass Card (Dark)
```html
<div class="bg-slate-800/90 backdrop-blur rounded-2xl p-6 border border-slate-700/50 shadow-xl">
  <!-- Content -->
</div>
```

---

### Navigation

#### NavBar
```html
<header class="sticky top-0 z-50 bg-white shadow-md">
  <div class="container mx-auto px-4 py-3 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-600 to-rose-400 flex items-center justify-center font-bold text-white">
        EC
      </div>
      <div>
        <span class="font-bold text-lg text-blue-700">EnglishClub</span>
        <div class="text-xs text-slate-600">Learn • Teach • Explore</div>
      </div>
    </div>
    <!-- Search + Actions -->
  </div>
</header>
```

#### Sidebar Item (Active)
```html
<a class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg">
  <span class="text-lg">📊</span>
  <span>Dashboard</span>
</a>
```

#### Sidebar Item (Inactive)
```html
<a class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition">
  <span class="text-lg">📊</span>
  <span>Dashboard</span>
</a>
```

---

### Inputs

#### Text Input
```html
<input 
  type="text"
  class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
  placeholder="Enter text..."
/>
```

#### Search Input (Pill)
```html
<div class="flex items-center bg-slate-100 rounded-full px-4 py-2">
  <input 
    type="text" 
    placeholder="Search..." 
    class="bg-transparent outline-none text-sm flex-1 text-slate-700"
  />
  <span class="text-teal-600">🔍</span>
</div>
```

#### Select
```html
<select class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400">
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

### Badges & Tags

#### Role Badge
```html
<span class="px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700">
  Student
</span>
```

#### Priority Badge (High)
```html
<span class="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">
  High
</span>
```

#### Status Badge (Success)
```html
<span class="px-2 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
  ✓ Completed
</span>
```

---

### Progress Components

#### Progress Bar
```html
<div class="h-2 bg-slate-100 rounded-full overflow-hidden">
  <div class="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all" style="width: 75%"></div>
</div>
```

#### Progress Ring (React)
```jsx
<svg width="120" height="120" className="transform -rotate-90">
  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
  <circle cx="60" cy="60" r="50" fill="none" stroke="#06b6d4" strokeWidth="10" 
    strokeDasharray="314" strokeDashoffset="78.5" strokeLinecap="round" />
</svg>
```

---

## Layout Patterns

### Dashboard Layout
```
┌────────────────────────────────────────────────┐
│                    NavBar                      │
├──────────────┬─────────────────────────────────┤
│              │                                 │
│   Sidebar    │        Main Content             │
│   (256px)    │                                 │
│              │                                 │
│              │                                 │
├──────────────┴─────────────────────────────────┤
│                   Footer                       │
└────────────────────────────────────────────────┘
```

### Sidebar Structure
```html
<aside class="w-64 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-5">
  <!-- User Profile -->
  <div class="flex items-center gap-3 pb-4 border-b border-slate-700/50">
    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
      J
    </div>
    <div>
      <p class="font-semibold text-white">John Doe</p>
      <p class="text-xs text-teal-400">🎓 Student</p>
    </div>
  </div>
  
  <!-- Navigation -->
  <nav class="mt-4 space-y-1">
    <!-- Menu Items -->
  </nav>
  
  <!-- Footer -->
  <div class="mt-auto pt-4 border-t border-slate-700/30">
    <!-- Help & Logout -->
  </div>
</aside>
```

---

## Gradients

### Primary Gradients
```css
/* Button Gradient */
background: linear-gradient(to right, #14b8a6, #06b6d4);

/* Sidebar Background */
background: linear-gradient(to bottom, #1e293b, #0f172a);

/* Logo Gradient */
background: linear-gradient(to bottom-right, #0d9488, #f43f5e);

/* Footer Gradient */
background: linear-gradient(to bottom-right, #134e4a, #0f172a, #881337);

/* Card Accent */
background: linear-gradient(to bottom-right, #14b8a6, #06b6d4);
```

### Tailwind Classes
```html
<!-- Button -->
<div class="bg-gradient-to-r from-teal-500 to-cyan-500">

<!-- Sidebar -->
<div class="bg-gradient-to-b from-slate-800 to-slate-900">

<!-- Logo -->
<div class="bg-gradient-to-br from-teal-600 to-rose-400">

<!-- Footer -->
<div class="bg-gradient-to-br from-teal-950 via-slate-900 to-rose-950">
```

---

## Animations

### Hover Scale
```css
.hover-scale:hover {
  transform: scale(1.05);
}
```
Tailwind: `hover:scale-105 transition-transform`

### Shadow Lift
```css
.shadow-lift:hover {
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
  transform: translateY(-2px);
}
```
Tailwind: `hover:shadow-xl hover:-translate-y-0.5 transition-all`

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind |
|------------|-------|----------|
| Mobile | < 640px | default |
| SM | ≥ 640px | `sm:` |
| MD | ≥ 768px | `md:` |
| LG | ≥ 1024px | `lg:` |
| XL | ≥ 1280px | `xl:` |

### Mobile-First Pattern
```html
<div class="p-4 md:p-6 lg:p-8">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<div class="hidden md:block">  <!-- Hide on mobile -->
<div class="md:hidden">        <!-- Show only on mobile -->
```

---

## Spacing Scale

| Name | Size | Usage |
|------|------|-------|
| 1 | 4px | Tight spacing |
| 2 | 8px | Icon gaps |
| 3 | 12px | Small padding |
| 4 | 16px | Default padding |
| 5 | 20px | Section padding |
| 6 | 24px | Card padding |
| 8 | 32px | Large gaps |

---

## Z-Index Layers

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Default content |
| Dropdown | 10 | Menus |
| Sticky | 20 | Sticky headers |
| Sidebar | 30 | Sidebars |
| Modal Backdrop | 40 | Modal overlay |
| Modal | 50 | Modal content |
| Toast | 60 | Notifications |

---

**Last Updated**: January 7, 2026
