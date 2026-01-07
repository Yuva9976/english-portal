import React, { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { colors, spacing, typography, borderRadius, shadows } from '../theme/designTokens'

const tutorNavItems = [
  { label: 'Dashboard', icon: '📊', to: '/tutor/dashboard' },
  { label: 'My Classes', icon: '🧑‍🏫', to: '/tutor/classes' },
  { label: 'Lessons & Quizzes', icon: '📚', to: '/tutor/lessons-quizzes' },
  { label: 'Resources', icon: '🗂️', to: '/tutor/resources' },
  { label: 'Students', icon: '👨‍🎓', to: '/tutor/students' },
  { label: 'Settings', icon: '⚙️', to: '/tutor/settings' },
]

export default function TutorLayout() {
  const [collapsed, setCollapsed] = useState(false)

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: colors.background,
  }

  const sidebarStyle = {
    width: collapsed ? '80px' : '280px',
    backgroundColor: colors.text.light,
    borderRight: `1px solid ${colors.border}`,
    padding: spacing.md,
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
    overflowY: 'auto',
    position: 'sticky',
    top: '60px',
    height: 'calc(100vh - 60px)',
  }

  const sidebarHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${colors.border}`,
  }

  const logoStyle = {
    width: '36px',
    height: '36px',
    borderRadius: borderRadius.md,
    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.text.light,
    fontWeight: 700,
    fontSize: '14px',
    flexShrink: 0,
  }

  const toggleBtnStyle = {
    background: 'none',
    border: 'none',
    color: colors.primary,
    cursor: 'pointer',
    fontSize: '18px',
    padding: spacing.xs,
  }

  const navListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    flex: 1,
  }

  const getNavItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: borderRadius.md,
    textDecoration: 'none',
    color: isActive ? colors.primary : colors.text.secondary,
    backgroundColor: isActive ? colors.background : 'transparent',
    borderLeft: isActive ? `3px solid ${colors.primary}` : '3px solid transparent',
    paddingLeft: isActive ? `calc(${spacing.md} - 3px)` : spacing.md,
    fontSize: '14px',
    fontWeight: isActive ? 600 : 500,
    fontFamily: typography.fontFamily.base,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  })

  const mainContentStyle = {
    flex: 1,
    overflow: 'auto',
  }

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        {/* Sidebar Header */}
        <div style={sidebarHeaderStyle}>
          <div style={logoStyle}>TC</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: colors.text.primary }}>
                Tutor
              </div>
              <div style={{ fontSize: '12px', color: colors.text.secondary }}>
                Workspace
              </div>
            </div>
          )}
          <button 
            style={toggleBtnStyle}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '»' : '‹'}
          </button>
        </div>

        {/* Navigation */}
        <nav style={navListStyle}>
          {tutorNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => getNavItemStyle(isActive)}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: spacing.md }}>
          <button
            style={{
              width: '100%',
              padding: `${spacing.md} ${spacing.sm}`,
              backgroundColor: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: colors.text.light,
              border: 'none',
              borderRadius: borderRadius.md,
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: typography.fontFamily.base,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            {collapsed ? '✨' : 'Premium'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <Outlet />
      </main>
    </div>
  )
}
