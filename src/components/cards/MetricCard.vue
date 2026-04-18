<template>
  <article class="rounded-md border border-border bg-neutral p-4">
    <div class="flex items-center justify-between gap-3">
      <p class="text-sm font-medium text-text-secondary">{{ label }}</p>
      <span class="grid size-9 place-items-center rounded-md bg-surface text-text-secondary">
        <slot name="icon">
          <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19V5" />
            <path d="M4 19h16" />
            <path d="m7 15 3-3 3 2 5-7" />
          </svg>
        </slot>
      </span>
    </div>
    <div class="mt-4 flex items-end justify-between gap-4">
      <p class="text-3xl font-black text-text-primary">{{ value }}</p>
      <p v-if="hint" class="pb-1 text-right text-xs text-text-secondary">{{ hint }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  hint?: string
}>()
</script>
