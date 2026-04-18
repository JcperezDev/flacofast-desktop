import type { AuthSession, AuthUser } from '../types/auth'
import { apiFetch, clearAuthStorage, getStoredUser, setAuthStorage } from './api.service'

export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = LoginInput & {
  name: string
}

export async function login(input: LoginInput) {
  const session = await apiFetch<AuthSession>('/api/auth/login', {
    method: 'POST',
    body: input,
  })

  setAuthStorage(session.token, session.user)
  return session
}

export async function register(input: RegisterInput) {
  return apiFetch<{ message: string; user: AuthUser }>('/api/auth/register', {
    method: 'POST',
    body: input,
  })
}

export async function loadMe() {
  const result = await apiFetch<{ user: AuthUser }>('/api/auth/me')
  return result.user
}

export function restoreAuthSession() {
  return getStoredUser<AuthUser>()
}

export function logout() {
  clearAuthStorage()
}
