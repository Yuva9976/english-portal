// Frontend: Role-Based Navigation Configuration
// File: src/config/navigation.js

export const NAVIGATION_BY_ROLE = {
  learner: [
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { label: 'Learn English', icon: '📚', path: '/modules' },
    { label: 'Grammar Hub', icon: '🎨', path: '/modules/grammar-hub' },
    { label: 'My Results', icon: '📝', path: '/my-results' },
    { label: 'Profile', icon: '👤', path: '/profile' },
  ],
  teacher: [
    { label: 'Dashboard', icon: '📊', path: '/tutor/dashboard' },
    { label: 'My Classes', icon: '🧑‍🏫', path: '/tutor/classes' },
    { label: 'Lessons & Quizzes', icon: '📚', path: '/tutor/lessons-quizzes' },
    { label: 'Students', icon: '👨‍🎓', path: '/tutor/students' },
    { label: 'Resources', icon: '🗂️', path: '/tutor/resources' },
    { label: 'Settings', icon: '⚙️', path: '/tutor/settings' },
  ],
  admin: [
    { label: 'Dashboard', icon: '📊', path: '/admin-dashboard' },
    { label: 'Users', icon: '👥', path: '/admin/users' },
    { label: 'Classes', icon: '🏫', path: '/admin/classes' },
    { label: 'Content', icon: '📄', path: '/admin/content' },
    { label: 'Reports', icon: '📈', path: '/admin/reports' },
    { label: 'Settings', icon: '⚙️', path: '/admin/settings' },
  ],
};

// Get navigation for current user role
export function getNavigationForRole(role) {
  return NAVIGATION_BY_ROLE[role] || NAVIGATION_BY_ROLE.learner;
}

// Frontend: Updated ProtectedRoute Component
// File: src/components/ProtectedRoute.jsx

import React from 'react'
import { Navigate } from 'react-router-dom'

// Define which roles can access which routes
const ROUTE_ACCESS = {
  '/dashboard': ['learner'],
  '/tutor/dashboard': ['teacher', 'tutor'],
  '/tutor/classes': ['teacher', 'tutor'],
  '/tutor/students': ['teacher', 'tutor'],
  '/admin-dashboard': ['admin'],
  '/admin/users': ['admin'],
  '/admin/classes': ['admin'],
};

function getRedirectForRole(role) {
  const roleMap = {
    'teacher': '/tutor/dashboard',
    'tutor': '/tutor/dashboard',
    'admin': '/admin-dashboard',
    'learner': '/dashboard',
  };
  return roleMap[role] || '/dashboard';
}

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to='/login' replace />;
  }

  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return <Navigate to='/login' replace />;
  }

  const user = JSON.parse(userStr);
  const userRole = user.role || user.roleAlias || 'learner';

  // If allowedRoles specified, check if user has permission
  if (allowedRoles.length > 0) {
    if (!allowedRoles.includes(userRole)) {
      // User doesn't have access - redirect to their role's default dashboard
      const defaultPath = getRedirectForRole(userRole);
      return <Navigate to={defaultPath} replace />;
    }
  }

  return children;
}

// Backend: Role-Checking Middleware
// File: middleware/roleCheck.js

const { authRequired } = require('./auth');

// Check if user has specific role
function requireRole(allowedRoles = []) {
  return [
    authRequired,
    (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const userRole = req.user.role_alias || req.user.role;
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ 
          error: 'Access denied',
          message: `This resource requires one of: ${allowedRoles.join(', ')}`,
          userRole 
        });
      }

      next();
    }
  ];
}

module.exports = { requireRole };

// Backend: Example Route with Role Check
// File: routes/tutorDashboard.js

const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/roleCheck');
const { Classroom, User } = require('../models');

// Only teachers can access
router.get('/overview', requireRole(['teacher', 'tutor']), async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Query only classes owned by THIS teacher
    const classes = await Classroom.findAll({
      where: { teacher_id: teacherId },
      attributes: ['id', 'title', 'description'],
    });

    const stats = {
      activeClasses: classes.length,
      totalStudents: 0, // Will calculate from enrollments
      avgQuizScore: 0,  // Will calculate from attempts
    };

    return res.json({
      success: true,
      data: {
        classes,
        stats,
        timestamp: new Date(),
      }
    });
  } catch (err) {
    console.error('Tutor dashboard error:', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

// Backend: Admin Can See All Classes
// File: routes/admin.js

const express = require('express');
const router = express.Router();
const { requireRole } = require('../middleware/roleCheck');
const { Classroom, User } = require('../models');

router.get('/classes', requireRole(['admin']), async (req, res) => {
  try {
    // No WHERE clause - admin sees everything
    const classes = await Classroom.findAll({
      include: [
        { model: User, as: 'teacher', attributes: ['id', 'name', 'email'] }
      ],
      attributes: ['id', 'title', 'description', 'teacher_id', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    return res.json({
      success: true,
      data: classes,
      count: classes.length,
    });
  } catch (err) {
    console.error('Admin classes error:', err);
    res.status(500).json({ error: 'Failed to load classes' });
  }
});

// Backend: Student Sees Only Their Data
// File: routes/learnerDashboard.js

router.get('/learner', requireRole(['learner']), async (req, res) => {
  try {
    const userId = req.user.id;

    // Only their own progress
    const progress = await Progress.findOne({
      where: { user_id: userId },
    });

    // Only their attempts
    const quizAttempts = await QuizAttempt.findAll({
      where: { user_id: userId },
      limit: 5,
      order: [['created_at', 'DESC']],
    });

    return res.json({
      success: true,
      data: {
        progress,
        recentQuizzes: quizAttempts,
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});
