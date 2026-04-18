<template>
  <section class="mx-auto max-w-7xl">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase text-emerald-300">Owner controls</p>
        <h1 class="mt-2 text-3xl font-black text-white">Admin</h1>
      </div>
      <button class="focus-ring min-h-11 rounded-md border border-white/10 px-4 text-sm font-bold text-white hover:bg-white/[0.06]" type="button" @click="load">
        Refresh
      </button>
    </div>

    <div v-if="state.currentUser?.role !== 'admin'" class="mt-6 rounded-md border border-yellow-300/20 bg-yellow-300/10 p-4 text-sm text-yellow-100">
      Sign in with the admin account configured in Coolify to manage users and VPS nodes.
    </div>

    <template v-else>
      <p v-if="error" class="mt-5 rounded-md border border-red-300/20 bg-red-300/10 p-3 text-sm text-red-100">{{ error }}</p>

      <div class="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
        <section class="rounded-md border border-white/10 bg-white/[0.04]">
          <div class="border-b border-white/10 p-4">
            <h2 class="text-lg font-bold text-white">User approvals</h2>
          </div>

          <div class="divide-y divide-white/10">
            <article v-for="user in users" :key="user.id" class="grid gap-3 p-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p class="font-bold text-white">{{ user.name }}</p>
                <p class="text-sm text-neutral-400">{{ user.email }} · {{ user.role }} · {{ user.status }}</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <button class="focus-ring min-h-9 rounded-md bg-emerald-300 px-3 text-xs font-bold text-neutral-950" type="button" @click="setStatus(user.id, 'approved')">Approve</button>
                <button class="focus-ring min-h-9 rounded-md border border-white/10 px-3 text-xs font-bold text-white" type="button" @click="setStatus(user.id, 'suspended')">Suspend</button>
                <button class="focus-ring min-h-9 rounded-md border border-red-300/30 px-3 text-xs font-bold text-red-100" type="button" @click="setStatus(user.id, 'rejected')">Reject</button>
              </div>
            </article>

            <p v-if="users.length === 0" class="p-6 text-sm text-neutral-400">No users yet.</p>
          </div>
        </section>

        <section class="rounded-md border border-white/10 bg-white/[0.04] p-4">
          <h2 class="text-lg font-bold text-white">Add VPS node</h2>
          <form class="mt-4 grid gap-3" @submit.prevent="addNode">
            <input v-model="nodeDraft.name" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Node name" />
            <input v-model="nodeDraft.host" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="VPS IP / host" />
            <div class="grid gap-3 sm:grid-cols-2">
              <input v-model.number="nodeDraft.port" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Port" type="number" />
              <input v-model="nodeDraft.region" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Region" />
            </div>
            <input v-model="nodeDraft.serverPublicKey" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Server public key" />
            <div class="grid gap-3 sm:grid-cols-2">
              <input v-model="nodeDraft.dns" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="DNS" />
              <input v-model="nodeDraft.interfaceName" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Interface" />
            </div>
            <input v-model="nodeDraft.clientAddress" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Client address" />
            <input v-model="nodeDraft.allowedIps" class="focus-ring min-h-11 rounded-md border border-white/10 bg-neutral-950 px-3 text-white" placeholder="Allowed IPs" />
            <label class="flex items-center gap-3 text-sm text-neutral-300">
              <input v-model="nodeDraft.isPrimary" class="size-5 accent-emerald-300" type="checkbox" />
              Make primary node
            </label>
            <button class="focus-ring min-h-11 rounded-md bg-emerald-300 px-4 text-sm font-bold text-neutral-950 hover:bg-emerald-200" type="submit">Add node</button>
          </form>
        </section>
      </div>

      <section class="mt-6 rounded-md border border-white/10 bg-white/[0.04]">
        <div class="border-b border-white/10 p-4">
          <h2 class="text-lg font-bold text-white">VPS nodes</h2>
        </div>
        <div class="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="node in nodes" :key="node.id" class="rounded-md border border-white/10 bg-neutral-950/50 p-4">
            <div class="flex items-center justify-between gap-3">
              <p class="font-bold text-white">{{ node.name }}</p>
              <span v-if="node.isPrimary" class="rounded-md bg-emerald-300/10 px-2 py-1 text-xs font-bold text-emerald-200">Primary</span>
            </div>
            <p class="mt-2 text-sm text-neutral-400">{{ node.host }}:{{ node.port }}</p>
            <p class="mt-1 text-sm text-neutral-500">{{ node.region }} · {{ node.status }}</p>
          </article>
        </div>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { createAdminNode, listAdminNodes, listUsers, updateUserStatus, type AdminNode, type AdminUser } from '../services/admin.service'
import { useAppStore } from '../store/app.store'
import type { UserStatus } from '../types/auth'

const { state } = useAppStore()
const users = ref<AdminUser[]>([])
const nodes = ref<AdminNode[]>([])
const error = ref('')
const nodeDraft = reactive({
  name: 'Main VPS',
  host: '',
  port: 51820,
  region: 'US East',
  isPrimary: false,
  status: 'unknown' as const,
  serverPublicKey: '',
  dns: '1.1.1.1',
  interfaceName: 'flacofast0',
  clientAddress: '10.8.0.2/32',
  allowedIps: '0.0.0.0/0, ::/0',
})

onMounted(load)

async function load() {
  if (state.currentUser?.role !== 'admin') return

  error.value = ''
  try {
    const [nextUsers, nextNodes] = await Promise.all([listUsers(), listAdminNodes()])
    users.value = nextUsers
    nodes.value = nextNodes
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to load admin data'
  }
}

async function setStatus(id: string, status: UserStatus) {
  try {
    const user = await updateUserStatus(id, status)
    users.value = users.value.map((item) => (item.id === user.id ? user : item))
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to update user'
  }
}

async function addNode() {
  try {
    const node = await createAdminNode({ ...nodeDraft })
    nodes.value = node.isPrimary ? [node, ...nodes.value.map((item) => ({ ...item, isPrimary: false }))] : [node, ...nodes.value]
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to create node'
  }
}
</script>
