<template>
  <button
    class="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors disabled:opacity-50"
    :class="variant === 'connect' ? 'bg-primary text-white hover:bg-primary-hover' : 'border border-border bg-neutral text-text-primary hover:bg-base'"
    :disabled="disabled"
    type="button"
  >
    <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path v-if="variant === 'connect'" d="m5 12 5 5L20 7" />
      <path v-else d="M6 6l12 12" />
      <path v-if="variant === 'disconnect'" d="M18 6 6 18" />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant: 'connect' | 'disconnect'
  disabled?: boolean
}>()
</script>
