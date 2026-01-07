import React from 'react'
import { Navigate } from 'react-router-dom'

const getRedirectForRole = (role) => {
  if (!role) return '/login'
  if (role === 'admin') return '/'
  if (role === 'learner' || role === 'student') return '/'
  if (role === 'tutor' || role === 'teacher') return '/tutor/dashboard'
  if (role === 'content_provider' || role === 'provider') return '/content-provider'
  return '/'
}

const getStoredRole = () => {
  const raw = localStorage.getItem('user')
  if (!raw) return null
  try {
    const user = JSON.parse(raw)
    // Use roleAlias if available, otherwise use role
    // Role can be: 'tutor'/'teacher' (for teachers), 'learner', 'admin'
    return user.roleAlias || user.role || null
  } catch (err) {
    console.error('Invalid user payload in storage', err)
    return null
  }
}

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to='/login' replace />

  const role = getStoredRole()
  
  // If no allowed roles specified, allow any authenticated user
  if (allowedRoles.length > 0) {
    // Check if user's role is in allowed roles
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to={getRedirectForRole(role)} replace />
    }
  }

  return children
}

