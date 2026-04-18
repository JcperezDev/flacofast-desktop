<template>
  <div class="min-h-screen lg:grid lg:grid-cols-[16rem_1fr] bg-base text-text-primary font-display">
    <aside class="border-b border-border bg-base/90 px-4 py-4 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:px-5">
      <div class="flex items-center justify-between lg:block">
        <RouterLink to="/app" class="focus-ring flex items-center gap-3 rounded-md">
          <span class="grid size-10 place-items-center rounded-md bg-primary text-lg font-black text-white">F</span>
          <span>
            <span class="block text-base font-bold tracking-normal text-text-primary">FlacoFast</span>
            <span class="block text-xs text-text-secondary">Enrutamiento WireGuard</span>
          </span>
        </RouterLink>

        <TunnelStatusBadge class="lg:hidden" :connected="state.tunnel.connected" />
      </div>

      <nav class="mt-5 grid grid-cols-5 gap-2 lg:grid-cols-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="focus-ring group flex min-h-12 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium text-text-secondary transition hover:border-border hover:bg-neutral hover:text-text-primary lg:justify-start lg:gap-3"
          :class="{ 'border-primary/30 bg-primary/10 text-primary hover:border-primary/30 hover:bg-primary/10 hover:text-primary': route.path === item.to }"
          :title="item.label"
        >
          <component :is="item.icon" class="size-5 shrink-0" />
          <span class="hidden lg:inline">{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="mt-6 hidden rounded-md border border-border bg-neutral p-4 lg:block">
        <template v-if="state.currentUser">
          <p class="text-sm font-semibold text-text-primary">{{ state.currentUser.name }}</p>
          <p class="mt-1 text-xs text-text-secondary">{{ state.currentUser.role }} · {{ state.currentUser.status }}</p>
          <button class="focus-ring mt-3 min-h-9 w-full rounded-md border border-border px-3 text-xs font-bold text-text-primary hover:bg-base" type="button" @click="signOut">
            Cerrar Sesión
          </button>
        </template>
        <template v-else>
          <RouterLink class="focus-ring block rounded-md text-sm font-semibold text-primary" to="/login">Iniciar Sesión</RouterLink>
          <RouterLink class="focus-ring mt-2 block rounded-md text-sm text-text-secondary hover:text-text-primary transition" to="/register">Crear cuenta</RouterLink>
        </template>
      </div>

      <div class="mt-6 hidden rounded-md border border-border bg-neutral p-4 lg:block">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-semibold text-text-primary">Túnel</span>
          <TunnelStatusBadge :connected="state.tunnel.connected" />
        </div>
        <p class="mt-3 text-sm text-text-secondary">{{ selectedNode.name }} · {{ selectedNode.region }}</p>
      </div>
    </aside>

    <main class="min-w-0 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 bg-base">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { logout } from '../../services/auth.service'
import { useAppStore } from '../../store/app.store'
import TunnelStatusBadge from '../common/TunnelStatusBadge.vue'

const route = useRoute()
const router = useRouter()
const { state, selectedNode } = useAppStore()

const iconBase = {
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  'stroke-width': '1.8',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

const HomeIcon = () => h('svg', iconBase, [h('path', { d: 'm3 11 9-8 9 8' }), h('path', { d: 'M5 10v10h14V10' }), h('path', { d: 'M9 20v-6h6v6' })])
const GamesIcon = () => h('svg', iconBase, [h('path', { d: 'M6 14h4' }), h('path', { d: 'M8 12v4' }), h('path', { d: 'M15 13h.01' }), h('path', { d: 'M18 15h.01' }), h('path', { d: 'M5.5 18h13a3 3 0 0 0 2.9-3.76l-1.2-4.6A4 4 0 0 0 16.35 7h-8.7A4 4 0 0 0 3.8 9.64l-1.2 4.6A3 3 0 0 0 5.5 18Z' })])
const NodesIcon = () => h('svg', iconBase, [h('path', { d: 'M12 3v6' }), h('path', { d: 'M12 15v6' }), h('path', { d: 'M5.6 6.5 10 10' }), h('path', { d: 'm14 14 4.4 3.5' }), h('path', { d: 'M3 12h6' }), h('path', { d: 'M15 12h6' }), h('circle', { cx: '12', cy: '12', r: '3' })])
const HistoryIcon = () => h('svg', iconBase, [h('path', { d: 'M3 12a9 9 0 1 0 3-6.7' }), h('path', { d: 'M3 5v6h6' }), h('path', { d: 'M12 7v5l3 2' })])
const SettingsIcon = () => h('svg', iconBase, [h('path', { d: 'M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z' }), h('path', { d: 'M19.4 15a1.8 1.8 0 0 0 .36 1.98l.06.06a2.1 2.1 0 1 1-2.97 2.97l-.06-.06a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.66v.17a2.1 2.1 0 0 1-4.2 0v-.1a1.8 1.8 0 0 0-1.18-1.69 1.8 1.8 0 0 0-1.98.36l-.06.06a2.1 2.1 0 1 1-2.97-2.97l.06-.06A1.8 1.8 0 0 0 3.8 15a1.8 1.8 0 0 0-1.66-1.1H2a2.1 2.1 0 0 1 0-4.2h.1a1.8 1.8 0 0 0 1.69-1.18 1.8 1.8 0 0 0-.36-1.98l-.06-.06A2.1 2.1 0 1 1 6.34 3.5l.06.06a1.8 1.8 0 0 0 1.98.36H8.5A1.8 1.8 0 0 0 9.6 2.26V2a2.1 2.1 0 1 1 4.2 0v.1a1.8 1.8 0 0 0 1.1 1.66 1.8 1.8 0 0 0 1.98-.36l.06-.06a2.1 2.1 0 1 1 2.97 2.97l-.06.06a1.8 1.8 0 0 0-.36 1.98v.12a1.8 1.8 0 0 0 1.66 1.1h.17a2.1 2.1 0 0 1 0 4.2h-.1A1.8 1.8 0 0 0 19.4 15Z' })])
const AdminIcon = () => h('svg', iconBase, [h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }), h('circle', { cx: '9', cy: '7', r: '4' }), h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }), h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })])

const baseNavItems = [
  { to: '/app', label: 'Dashboard', icon: HomeIcon },
  { to: '/app/games', label: 'Juegos', icon: GamesIcon },
  { to: '/app/nodes', label: 'Nodos', icon: NodesIcon },
  { to: '/app/history', label: 'Historial', icon: HistoryIcon },
  { to: '/app/settings', label: 'Ajustes', icon: SettingsIcon },
]

const navItems = computed(() => {
  if (state.currentUser?.role === 'admin') {
    return [...baseNavItems, { to: '/app/admin', label: 'Admin', icon: AdminIcon }]
  }

  return baseNavItems
})

function signOut() {
  logout()
  state.currentUser = null
  void router.push('/login')
}
</script>
