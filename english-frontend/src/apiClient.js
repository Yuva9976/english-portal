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

export default apiClient
