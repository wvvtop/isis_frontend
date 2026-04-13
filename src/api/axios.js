import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)

  if (match) {
    config.headers['X-XSRF-TOKEN'] = match[1]
  }

  return config
})

export default api
