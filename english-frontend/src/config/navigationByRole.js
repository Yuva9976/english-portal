// src/config/navigationByRole.js
// Navigation menu items based on user role

export const NAVIGATION_BY_ROLE = {
  learner: [
    { label: 'Dashboard', icon: '📊', path: '/learner' },
    { label: 'Learn English', icon: '📚', path: '/modules/learn-english' },
    { label: 'Grammar Hub', icon: '🎨', path: '/modules/grammar-hub' },
    { label: 'Vocabulary Hub', icon: '📖', path: '/vocabulary-hub' },
    { label: 'My Classes', icon: '🗓️', path: '/learner/classes' },
    { label: 'Browse Classes', icon: '🔍', path: '/learner/browse' },
    { label: 'My Tasks', icon: '📋', path: '/learner/tasks' },
    { label: 'Settings', icon: '⚙️', path: '/learner/settings' },
  ],
  teacher: [
    { label: 'Dashboard', icon: '📊', path: '/tutor/dashboard' },
    { label: 'My Classes', icon: '🧑‍🏫', path: '/tutor/classes' },
    { label: 'Lessons & Quizzes', icon: '📚', path: '/tutor/lessons-quizzes' },
    { label: 'Students', icon: '👨‍🎓', path: '/tutor/students' },
    { label: 'Vocabulary Hub', icon: '📖', path: '/vocabulary-hub' },
    { label: 'Resources', icon: '🗂️', path: '/tutor/resources' },
    { label: 'Settings', icon: '⚙️', path: '/tutor/settings' },
  ],
  tutor: [
    { label: 'Dashboard', icon: '📊', path: '/tutor/dashboard' },
    { label: 'My Classes', icon: '🧑‍🏫', path: '/tutor/classes' },
    { label: 'Lessons & Quizzes', icon: '📚', path: '/tutor/lessons-quizzes' },
    { label: 'Vocabulary Hub', icon: '📖', path: '/vocabulary-hub' },
    { label: 'Students', icon: '👨‍🎓', path: '/tutor/students' },
    { label: 'Resources', icon: '🗂️', path: '/tutor/resources' },
    { label: 'Settings', icon: '⚙️', path: '/tutor/settings' },
  ],
  admin: [
    { label: 'Dashboard', icon: '📊', path: '/admin-dashboard/overview' },
    { label: 'Content Queue', icon: '📋', path: '/admin-dashboard/content-queue' },
    { label: 'Assignments', icon: '🎓', path: '/admin-dashboard/assignments' },
    { label: 'Vocabulary Hub', icon: '📖', path: '/vocabulary-hub' },
    { label: 'Users', icon: '👥', path: '/admin-dashboard/learners' },
    { label: 'Analytics', icon: '📈', path: '/admin-dashboard/analytics' },
    { label: 'System Logs', icon: '📜', path: '/admin-dashboard/audit-logs' },
    { label: 'Profile', icon: '👤', path: '/admin-dashboard/profile' }
  ],
  content_provider: [
    { label: 'Dashboard', icon: '📊', path: '/content-provider/dashboard' },
    { label: 'My Courses', icon: '📚', path: '/content-provider/courses' },
    { label: 'Create Course', icon: '➕', path: '/content-provider/create-course' },
    { label: 'Bulk Upload', icon: '🚀', path: '/content-provider/bulk-upload' },
    { label: 'Vocabulary Hub', icon: '📖', path: '/vocabulary-hub' },
    { label: 'Shared Assets', icon: '🗂️', path: '/content-provider/resources' },
    { label: 'Profile', icon: '👤', path: '/content-provider/settings' },
  ],
};

/**
 * Get navigation menu for a specific role
 * @param {string} role - User role (learner, teacher, admin, tutor)
 * @returns {array} Navigation menu items
 */
export function getNavigationForRole(role) {
  return NAVIGATION_BY_ROLE[role] || NAVIGATION_BY_ROLE.learner;
}

/**
 * Check if user can access a route
 * @param {string} role - User role
 * @param {string} path - Route path
 * @returns {boolean} Whether user can access this path
 */
export function canAccessPath(role, path) {
  const navigation = getNavigationForRole(role);
  return navigation.some(item => item.path === path);
}
