<template>
  <form class="grid gap-4" @submit.prevent="submit">
    <div class="grid gap-4 md:grid-cols-2">
      <label v-for="field in fields" :key="field.key" class="grid gap-2">
        <span class="text-sm font-medium text-neutral-300">{{ field.label }}</span>
        <input
          v-model="draft[field.key]"
          class="focus-ring min-h-12 rounded-md border border-white/10 bg-neutral-950 px-3 text-white placeholder:text-neutral-600"
          :type="field.type"
          :placeholder="field.placeholder"
        />
        <span v-if="errors[field.key]" class="text-xs text-red-300">{{ errors[field.key] }}</span>
      </label>
    </div>

    <label class="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4">
      <span>
        <span class="block text-sm font-semibold text-white">Auto-connect</span>
        <span class="block text-sm text-neutral-400">Start the selected tunnel when the app opens.</span>
      </span>
      <input v-model="draft.autoConnect" class="size-5 accent-emerald-300" type="checkbox" />
    </label>

    <div class="flex justify-end">
      <button class="focus-ring min-h-12 rounded-md bg-emerald-300 px-5 text-sm font-bold text-neutral-950 hover:bg-emerald-200" type="submit">
        Save Settings
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { AppConfig } from '../../types/config'

const props = defineProps<{
  config: AppConfig
  errors: Partial<Record<keyof AppConfig, string>>
}>()

const emit = defineEmits<{
  save: [config: AppConfig]
}>()

const draft = reactive<AppConfig>({ ...props.config })

const fields: Array<{ key: keyof AppConfig; label: string; type: string; placeholder?: string }> = [
  { key: 'vpsHost', label: 'VPS IP / Host', type: 'text', placeholder: '203.0.113.10' },
  { key: 'wireGuardPort', label: 'WireGuard UDP Port', type: 'number', placeholder: '51820' },
  { key: 'serverPublicKey', label: 'Server Public Key', type: 'text', placeholder: 'base64 public key' },
  { key: 'dns', label: 'DNS', type: 'text', placeholder: '1.1.1.1' },
  { key: 'nodeName', label: 'Node Name', type: 'text', placeholder: 'Main VPS' },
  { key: 'region', label: 'Region', type: 'text', placeholder: 'US East' },
  { key: 'interfaceName', label: 'Interface Name', type: 'text', placeholder: 'flacofast0' },
  { key: 'clientAddress', label: 'Client Address', type: 'text', placeholder: '10.8.0.2/32' },
  { key: 'allowedIps', label: 'Allowed IPs', type: 'text', placeholder: '0.0.0.0/0, ::/0' },
]

watch(
  () => props.config,
  (config) => Object.assign(draft, config),
)

function submit() {
  emit('save', { ...draft, wireGuardPort: Number(draft.wireGuardPort) })
}
</script>
