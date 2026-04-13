import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/colors.css'

import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)

const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
