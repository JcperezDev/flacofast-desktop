import type { UserRole, UserStatus } from '../types/auth'
import { apiFetch } from './api.service'

export type AdminUser = {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  createdAt: string
  approvedAt: string | null
}

export type AdminNode = {
  id: string
  name: string
  host: string
  port: number
  region: string
  isPrimary: boolean
  status: 'online' | 'offline' | 'unknown'
  serverPublicKey: string
  dns: string
  interfaceName: string
  clientAddress: string
  allowedIps: string
}

export type AdminNodeInput = Omit<AdminNode, 'id'>

export async function listUsers() {
  const result = await apiFetch<{ users: AdminUser[] }>('/api/admin/users')
  return result.users
}

export async function updateUserStatus(id: string, status: UserStatus) {
  const result = await apiFetch<{ user: AdminUser }>(`/api/admin/users/${id}/status`, {
    method: 'PATCH',
    body: { status },
  })
  return result.user
}

export async function listAdminNodes() {
  const result = await apiFetch<{ nodes: AdminNode[] }>('/api/admin/nodes')
  return result.nodes
}

export async function createAdminNode(input: AdminNodeInput) {
  const result = await apiFetch<{ node: AdminNode }>('/api/admin/nodes', {
    method: 'POST',
    body: input,
  })
  return result.node
}
