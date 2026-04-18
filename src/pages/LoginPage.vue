<template>
  <div class="min-h-screen bg-base text-text-primary font-display overflow-hidden selection:bg-primary/30 flex items-center justify-center p-6">
    <section class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold tracking-tight text-text-primary">Iniciar Sesión</h1>
        <p class="mt-2 text-sm text-text-secondary">Usa la cuenta aprobada por el administrador.</p>
      </div>

      <form class="grid gap-4 rounded-lg border border-border bg-neutral p-6" @submit.prevent="submit">
        <label class="grid gap-2">
          <span class="text-sm font-medium text-text-secondary">Correo Electrónico</span>
          <input v-model="email" class="focus-ring h-8 rounded-md border border-border bg-base px-3 text-sm text-text-primary placeholder-text-secondary transition-colors focus:border-primary" type="email" autocomplete="email" />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-medium text-text-secondary">Contraseña</span>
          <input v-model="password" class="focus-ring h-8 rounded-md border border-border bg-base px-3 text-sm text-text-primary placeholder-text-secondary transition-colors focus:border-primary" type="password" autocomplete="current-password" />
        </label>

        <p v-if="error" class="rounded-md border border-error/20 bg-error/10 p-3 text-sm text-error">{{ error }}</p>

        <button class="focus-ring mt-2 h-8 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50" type="submit" :disabled="loading">
          Entrar
        </button>

        <RouterLink class="mt-4 block text-center text-sm font-medium text-text-secondary transition-colors hover:text-text-primary" to="/register">
          Crear una cuenta
        </RouterLink>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { login } from '../services/auth.service'
import { useAppStore } from '../store/app.store'

const router = useRouter()
const { state } = useAppStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  error.value = ''

  try {
    const session = await login({ email: email.value, password: password.value })
    state.currentUser = session.user
    await router.push(session.user.role === 'admin' ? '/app/admin' : '/app')
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>
