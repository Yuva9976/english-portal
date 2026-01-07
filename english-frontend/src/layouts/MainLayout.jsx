import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global NavBar with role-based navigation */}
      <NavBar />

      {/* Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
