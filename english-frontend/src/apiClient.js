import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true, // if backend sets httpOnly cookie
})

// attach token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
 
// handle expired token or unauthorized access
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Avoid redirect loop if already on login
      const isAuthPage = window.location.pathname.includes('/login') || window.location.pathname.includes('/register');
      
      if (!isAuthPage) {
        console.warn('Authentication expired or failed. Redirecting to login...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Grammar API methods
export const grammarAPI = {
  // Get all parts of speech
  getAllParts: () => apiClient.get('/grammar'),

  // Get specific part details (e.g., Nouns, Verbs, etc.)
  getPartDetails: (partId) => apiClient.get(`/grammar/${partId}`),

  // Get types for a part (e.g., noun types: common, proper, abstract)
  getTypes: (partId) => apiClient.get(`/grammar/${partId}/types`),

  // Get grammar rules for a part
  getRules: (partId) => apiClient.get(`/grammar/${partId}/rules`),

  // Get examples for a part
  getExamples: (partId) => apiClient.get(`/grammar/${partId}/examples`),

  // Get exercises for a part
  getExercises: (partId) => apiClient.get(`/grammar/${partId}/exercises`),

  // Get quiz questions for a part
  getQuiz: (partId) => apiClient.get(`/grammar/${partId}/quiz`),

  // Get resources for a part
  getResources: (partId) => apiClient.get(`/grammar/${partId}/resources`),
}

export default apiClient

