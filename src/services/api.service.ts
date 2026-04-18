const tokenKey = 'flacofast.auth.token'
const userKey = 'flacofast.auth.user'

type ApiOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
}

const apiBaseUrl = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export function getApiBaseUrl() {
  return apiBaseUrl || 'same-origin /api'
}

export function getAuthToken() {
  return localStorage.getItem(tokenKey)
}

export function hasAuthToken() {
  return Boolean(getAuthToken())
}

export function setAuthStorage(token: string, user: unknown) {
  localStorage.setItem(tokenKey, token)
  localStorage.setItem(userKey, JSON.stringify(user))
}

export function getStoredUser<T>() {
  const raw = localStorage.getItem(userKey)
  return raw ? (JSON.parse(raw) as T) : null
}

export function clearAuthStorage() {
  localStorage.removeItem(tokenKey)
  localStorage.removeItem(userKey)
}

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = getAuthToken()
  const headers = new Headers(options.headers)

  if (options.body !== undefined && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
    body: options.body === undefined || options.body instanceof FormData ? options.body : JSON.stringify(options.body),
  })

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message ?? `API request failed with ${response.status}`)
  }

  return data as T
}
