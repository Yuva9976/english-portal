/**
 * REACT ROUTER v6+ NESTED ROUTES GUIDE
 * English Learning App - Grammar Hub Implementation
 * 
 * This file demonstrates the complete structure and best practices
 * for nested routes in a React Router v6+ application.
 */

// ============================================================
// FILE: src/App.jsx (Main Router Configuration)
// ============================================================

/*
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import SiteFooter from './components/SiteFooter'
import ProtectedRoute from './components/ProtectedRoute'

// Layout Components
import GrammarHubLayout from './pages/GrammarHub/GrammarHubLayout'

// Page Components
import Home from './pages/Home'
import GrammarHubDashboard from './pages/GrammarHub/GrammarHubDashboard'
import GrammarPage from './pages/GrammarHub/GrammarPage'
import VocabularyHub from './pages/GrammarHub/VocabularyHub'
import PronunciationHub from './pages/GrammarHub/PronunciationHub'

export default function App() {
  const location = useLocation()
  
  // Hide NavBar for pages with their own layout
  const hideNavBar = location.pathname.startsWith('/grammar-hub')
  
  return (
    <div className='min-h-screen flex flex-col'>
      {!hideNavBar && <NavBar />}
      
      <main className={hideNavBar ? 'flex-1' : 'flex-1 container mx-auto px-4 py-8'}>
        <Routes>
          {/* Main route */}
          <Route path='/' element={<Home />} />
          
          {/* Nested Grammar Hub Routes with Layout */}
          {/* This is the parent route with the layout component */}
          <Route 
            path='/grammar-hub' 
            element={
              <ProtectedRoute>
                <GrammarHubLayout />
              </ProtectedRoute>
            }
          >
            {/* Index route - rendered at /grammar-hub */}
            <Route index element={<GrammarHubDashboard />} />
            
            {/* Nested child routes */}
            <Route path='grammar' element={<GrammarPage />} />
            <Route path='vocabulary' element={<VocabularyHub />} />
            <Route path='pronunciation' element={<PronunciationHub />} />
          </Route>
          
          {/* Catch all */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
      
      {!hideNavBar && <SiteFooter />}
    </div>
  )
}
*/

// ============================================================
// FILE: src/pages/GrammarHub/GrammarHubLayout.jsx
// ============================================================

/*
import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const GrammarHubLayout = () => {
  // Navigation items for secondary nav
  const navItems = [
    { path: '/grammar-hub', label: 'Overview', icon: '📊' },
    { path: '/grammar-hub/grammar', label: 'Grammar', icon: '✏️' },
    { path: '/grammar-hub/vocabulary', label: 'Vocabulary', icon: '📚' },
    { path: '/grammar-hub/pronunciation', label: 'Pronunciation', icon: '🎤' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-rose-50">
      {/* Secondary Navigation - Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-teal-700">📚 Grammar Hub</span>
            </div>
            
            {/* Navigation Tabs using NavLink */}
            <nav className="flex gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  // This function receives an object with isActive status
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold 
                     transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg'
                        : 'text-slate-700 hover:bg-teal-50 border border-gray-200'
                    }`
                  }
                  // end ensures exact match for root /grammar-hub
                  end={item.path === '/grammar-hub'}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Area - Outlet renders child routes here */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default GrammarHubLayout
*/

// ============================================================
// PLACEHOLDER COMPONENTS (For reference)
// ============================================================

// FILE: src/pages/GrammarHub/GrammarHubDashboard.jsx (Index Route)
/*
const GrammarHubDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-teal-700">Welcome to Grammar Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-teal-400">
          <div className="text-4xl mb-3">✏️</div>
          <h2 className="text-xl font-bold mb-2">Grammar</h2>
          <p className="text-gray-600 mb-4">Master grammar rules with interactive lessons</p>
          <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
            Start Learning
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-cyan-400">
          <div className="text-4xl mb-3">📚</div>
          <h2 className="text-xl font-bold mb-2">Vocabulary</h2>
          <p className="text-gray-600 mb-4">Expand your vocabulary with contextual learning</p>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">
            Start Learning
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-rose-400">
          <div className="text-4xl mb-3">🎤</div>
          <h2 className="text-xl font-bold mb-2">Pronunciation</h2>
          <p className="text-gray-600 mb-4">Perfect your pronunciation with audio guides</p>
          <button className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700">
            Start Learning
          </button>
        </div>
      </div>
    </div>
  )
}

export default GrammarHubDashboard
*/

// FILE: src/pages/GrammarHub/GrammarPage.jsx
/*
const GrammarPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Grammar Lessons</h1>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          Learn English grammar fundamentals, advanced structures, and common mistakes.
        </p>
        {/* Grammar content goes here */}
      </div>
    </div>
  )
}

export default GrammarPage
*/

// FILE: src/pages/GrammarHub/VocabularyHub.jsx
/*
const VocabularyHub = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vocabulary Builder</h1>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          Expand your English vocabulary with interactive exercises and flashcards.
        </p>
        {/* Vocabulary content goes here */}
      </div>
    </div>
  )
}

export default VocabularyHub
*/

// FILE: src/pages/GrammarHub/PronunciationHub.jsx
/*
const PronunciationHub = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pronunciation Practice</h1>
      <div className="bg-white p-8 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          Master English pronunciation with audio guides and recording exercises.
        </p>
        {/* Pronunciation content goes here */}
      </div>
    </div>
  )
}

export default PronunciationHub
*/

// ============================================================
// KEY CONCEPTS - REACT ROUTER v6+
// ============================================================

/*
1. NESTED ROUTES STRUCTURE:
   ├── /grammar-hub (Parent route with GrammarHubLayout)
   ├── /grammar-hub (index) → GrammarHubDashboard
   ├── /grammar-hub/grammar → GrammarPage
   ├── /grammar-hub/vocabulary → VocabularyHub
   └── /grammar-hub/pronunciation → PronunciationHub

2. <Outlet /> Component:
   - Renders child routes at the location where Outlet is placed
   - In GrammarHubLayout, <Outlet /> displays the current child component
   - Example: At /grammar-hub/grammar, Outlet renders <GrammarPage />

3. <NavLink> Component:
   - Similar to <Link> but adds active state styling
   - Receives { isActive } in className function
   - Perfect for navigation tabs with active highlighting
   - Use 'end' prop for exact matching on root routes

4. route.index Element:
   - Renders at the parent route path without additional path segment
   - <Route index element={<Component />} /> renders at /grammar-hub
   - Useful for dashboard/overview pages

5. Protected Routes:
   - Wrap layout/pages with <ProtectedRoute> to require authentication
   - Authentication check happens before rendering the component
*/

// ============================================================
// NAVIGATION INTEGRATION (NavBar)
// ============================================================

/*
In your main NavBar component:

import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()

  return (
    <nav>
      {/* Grammar Hub Link */}
      <Link 
        to='/grammar-hub'
        className={location.pathname.startsWith('/grammar-hub') ? 'active' : ''}
      >
        Grammar Hub
      </Link>
      
      {/* Other navigation links */}
    </nav>
  )
}

Clicking "Grammar Hub" navigates to /grammar-hub (shows dashboard)
The GrammarHubLayout wraps all grammar-hub/* routes
Secondary nav in GrammarHubLayout shows active tab highlighting
*/

// ============================================================
// STYLING ACTIVE ROUTES
// ============================================================

/*
Using NavLink for active state:

<NavLink
  to='/grammar-hub/grammar'
  className={({ isActive }) => 
    isActive 
      ? 'bg-blue-500 text-white px-4 py-2 rounded'
      : 'text-gray-700 px-4 py-2 hover:bg-gray-100 rounded'
  }
>
  Grammar
</NavLink>

This automatically:
- Adds the 'active' class when route matches
- Applies conditional styles based on isActive
- Updates when navigation changes
*/

export { /* This is a documentation file - no exports */ }
