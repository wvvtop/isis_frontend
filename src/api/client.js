// src/api/client.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api', // благодаря proxy в vite.config.js
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — добавляем Bearer токен автоматически
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor — обработка ошибок 401 (токен устарел)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login' // или использовать router
    }
    return Promise.reject(error)
  },
)

export default apiClient
