import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '../../pages/AdminPage.vue'
import GamesPage from '../../pages/GamesPage.vue'
import HistoryPage from '../../pages/HistoryPage.vue'
import HomePage from '../../pages/HomePage.vue'
import LoginPage from '../../pages/LoginPage.vue'
import NodesPage from '../../pages/NodesPage.vue'
import RegisterPage from '../../pages/RegisterPage.vue'
import SettingsPage from '../../pages/SettingsPage.vue'
import LandingPage from '../../pages/LandingPage.vue'
import SidebarLayout from '../../components/layout/SidebarLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'landing', component: LandingPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/register', name: 'register', component: RegisterPage },
    {
      path: '/app',
      component: SidebarLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'games', name: 'games', component: GamesPage },
        { path: 'nodes', name: 'nodes', component: NodesPage },
        { path: 'history', name: 'history', component: HistoryPage },
        { path: 'settings', name: 'settings', component: SettingsPage },
        { path: 'admin', name: 'admin', component: AdminPage },
      ],
    },
  ],
})

// Automatically redirect desktop (Tauri) users to the app dashboard, bypassing the landing page
router.beforeEach((to, _from, next) => {
  // @ts-ignore
  const isTauri = window.__TAURI__ !== undefined
  if (isTauri && to.path === '/') {
    next('/app')
  } else {
    next()
  }
})
