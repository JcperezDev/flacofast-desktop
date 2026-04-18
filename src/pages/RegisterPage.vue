<template>
  <div class="min-h-screen bg-base text-text-primary font-display overflow-hidden selection:bg-primary/30 flex items-center justify-center p-6">
    <section class="w-full max-w-md">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-semibold tracking-tight text-text-primary">Crear Cuenta</h1>
        <p class="mt-2 text-sm text-text-secondary">Las cuentas nuevas requieren aprobación del administrador.</p>
      </div>

      <form class="grid gap-4 rounded-lg border border-border bg-neutral p-6" @submit.prevent="submit">
        <label class="grid gap-2">
          <span class="text-sm font-medium text-text-secondary">Nombre</span>
          <input v-model="name" class="focus-ring h-8 rounded-md border border-border bg-base px-3 text-sm text-text-primary placeholder-text-secondary transition-colors focus:border-primary" type="text" autocomplete="name" />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-medium text-text-secondary">Correo Electrónico</span>
          <input v-model="email" class="focus-ring h-8 rounded-md border border-border bg-base px-3 text-sm text-text-primary placeholder-text-secondary transition-colors focus:border-primary" type="email" autocomplete="email" />
        </label>

        <label class="grid gap-2">
          <span class="text-sm font-medium text-text-secondary">Contraseña</span>
          <input v-model="password" class="focus-ring h-8 rounded-md border border-border bg-base px-3 text-sm text-text-primary placeholder-text-secondary transition-colors focus:border-primary" type="password" autocomplete="new-password" />
        </label>

        <p v-if="message" class="rounded-md border border-success/20 bg-success/10 p-3 text-sm text-success">{{ message }}</p>
        <p v-if="error" class="rounded-md border border-error/20 bg-error/10 p-3 text-sm text-error">{{ error }}</p>

        <button class="focus-ring mt-2 h-8 rounded-md bg-primary px-5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-50" type="submit" :disabled="loading">
          Solicitar Acceso
        </button>

        <RouterLink class="mt-4 block text-center text-sm font-medium text-text-secondary transition-colors hover:text-text-primary" to="/login">
          Ya tengo una cuenta
        </RouterLink>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { register } from '../services/auth.service'

const name = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  loading.value = true
  message.value = ''
  error.value = ''

  try {
    const result = await register({ name: name.value, email: email.value, password: password.value })
    message.value = result.message
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Error al registrarse'
  } finally {
    loading.value = false
  }
}
</script>
