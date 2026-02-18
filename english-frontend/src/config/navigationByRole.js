// src/config/navigationByRole.js
// Navigation menu items based on user role

export const NAVIGATION_BY_ROLE = {
  learner: [
    { label: 'Learn English', icon: '📚', path: '/modules' },
    { label: 'Grammar Hub', icon: '🎨', path: '/modules/grammar-hub' },
    { label: 'Dashboard', icon: '📊', path: '/dashboard' },
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
  tutor: [
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
