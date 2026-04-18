<template>
  <section class="mx-auto max-w-5xl">
    <div>
      <p class="text-sm font-semibold uppercase text-emerald-300">WireGuard</p>
      <h1 class="mt-2 text-3xl font-black text-white">Settings</h1>
    </div>

    <div class="mt-6 rounded-md border border-white/10 bg-white/[0.04] p-4 sm:p-6">
      <SettingsForm :config="state.config" :errors="errors" @save="save" />
    </div>

    <p v-if="saved" class="mt-4 rounded-md border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100">Settings saved.</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SettingsForm from '../components/forms/SettingsForm.vue'
import { useSettings } from '../composables/useSettings'
import { loadConfig } from '../services/config.service'
import { useAppStore } from '../store/app.store'
import type { AppConfig } from '../types/config'

const { state } = useAppStore()
const { persistConfig } = useSettings()
const saved = ref(false)
const errors = ref<Partial<Record<keyof AppConfig, string>>>({})

onMounted(async () => {
  state.config = await loadConfig()
})

async function save(config: AppConfig) {
  const result = await persistConfig(config)
  errors.value = result.errors
  saved.value = result.ok
}
</script>
