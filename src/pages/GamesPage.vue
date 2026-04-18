<template>
  <section class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase text-emerald-300">Profiles</p>
        <h1 class="mt-2 text-3xl font-black text-white">Games</h1>
      </div>
      <p class="max-w-xl text-sm text-neutral-400">Profiles keep the route choice tied to the game you are testing now.</p>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <GameCard
        v-for="game in state.games"
        :key="game.id"
        :game="game"
        :selected="state.selectedGameId === game.id"
        @click="state.selectedGameId = game.id"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import GameCard from '../components/games/GameCard.vue'
import { useAppStore } from '../store/app.store'

const { state } = useAppStore()
</script>
