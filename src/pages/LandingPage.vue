<template>
  <div class="min-h-screen bg-base text-text-primary font-display overflow-hidden selection:bg-primary/30">
    <!-- Header -->
    <header class="fixed inset-x-0 top-0 z-50 border-b border-border bg-base/80 backdrop-blur-md">
      <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <div class="flex items-center gap-3">
          <div class="grid size-6 place-items-center rounded bg-primary text-xs font-bold text-white">
            F
          </div>
          <span class="text-sm font-semibold tracking-tight text-text-primary">FlacoFast</span>
        </div>
        <div class="flex items-center gap-4">
          <RouterLink to="/login" class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Iniciar Sesión</RouterLink>
          <RouterLink to="/register" class="flex h-7 items-center rounded-md bg-transparent border border-border px-3 text-sm font-medium text-text-primary transition-colors hover:border-text-secondary">
            Regístrate
          </RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div class="mx-auto max-w-3xl">
          <h1 class="text-4xl font-semibold tracking-tight text-text-primary sm:text-6xl" style="letter-spacing: -0.03em;">
            Cero Lag.<br/>
            <span class="text-primary">Victorias Infinitas.</span>
          </h1>
          <p class="mt-6 text-base leading-relaxed text-text-secondary max-w-2xl mx-auto">
            FlacoFast es la herramienta definitiva para gamers competitivos. Reduce tu ping, estabiliza tu conexión y disfruta de partidas fluidas sin interrupciones.
          </p>
          <div class="mt-10 flex items-center justify-center gap-4">
            <a href="https://github.com/JcperezDev/flacofast/releases/latest" target="_blank" rel="noopener noreferrer" class="group flex h-8 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-y-px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Descargar para Windows
            </a>
            <RouterLink to="/app" class="flex h-8 items-center rounded-md bg-transparent border border-border px-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:border-text-secondary">
              Ver Dashboard
            </RouterLink>
          </div>
        </div>
      </div>
      
      <!-- Features Grid -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-24 sm:mt-32">
        <div class="border-t border-border pt-12">
          <h2 class="text-sm font-semibold tracking-wide text-primary uppercase">Rendimiento Extremo</h2>
          <p class="mt-2 text-2xl font-semibold text-text-primary" style="letter-spacing: -0.02em;">Todo lo que necesitas para dominar</p>
        </div>
        
        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <!-- Feature 1 -->
          <div class="flex flex-col bg-neutral border border-border p-5 rounded-lg">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex size-8 items-center justify-center rounded border border-border bg-surface">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="m13 2-2 2.5h3L11 22l2-2.5h-3L13 2Z"/></svg>
              </div>
              <h3 class="text-sm font-semibold text-text-primary">Latencia Ultra Baja</h3>
            </div>
            <p class="text-sm leading-relaxed text-text-secondary">Conéctate por las rutas más rápidas disponibles y siente la diferencia en cada partida competitiva.</p>
          </div>
          
          <!-- Feature 2 -->
          <div class="flex flex-col bg-neutral border border-border p-5 rounded-lg">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex size-8 items-center justify-center rounded border border-border bg-surface">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
              </div>
              <h3 class="text-sm font-semibold text-text-primary">App Nativa y Ligera</h3>
            </div>
            <p class="text-sm leading-relaxed text-text-secondary">Una aplicación de escritorio rápida, silenciosa y que no consume recursos mientras juegas.</p>
          </div>
          
          <!-- Feature 3 -->
          <div class="flex flex-col bg-neutral border border-border p-5 rounded-lg">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex size-8 items-center justify-center rounded border border-border bg-surface">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 class="text-sm font-semibold text-text-primary">Estabilidad Absoluta</h3>
            </div>
            <p class="text-sm leading-relaxed text-text-secondary">Evita las desconexiones repentinas, el packet loss y los picos de ping en los peores momentos.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-base py-8 text-center mt-auto">
      <p class="text-xs text-text-secondary font-code">&copy; 2026 FlacoFast. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
