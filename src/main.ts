import { createApp } from 'vue'
import App from './App.vue'
import { router } from './app/router'
import { restoreAuthSession } from './services/auth.service'
import { useAppStore } from './store/app.store'
import './styles/main.css'

const { state } = useAppStore()
state.currentUser = restoreAuthSession()

createApp(App).use(router).mount('#app')
