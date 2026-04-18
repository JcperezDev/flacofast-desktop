<template>
  <span
    class="inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors"
    :class="connected ? 'border-primary/30 bg-primary/10 text-primary' : 'border-border bg-neutral text-text-secondary'"
  >
    <span class="size-2 rounded-full" :class="connected ? 'bg-primary' : 'bg-text-secondary'" />
    {{ connected ? 'Conectado' : 'Desconectado' }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  connected: boolean
}>()
</script>
