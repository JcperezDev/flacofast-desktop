export type UserRole = 'admin' | 'user'
export type UserStatus = 'pending' | 'approved' | 'rejected' | 'suspended'

export type AuthUser = {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
}

export type AuthSession = {
  token: string
  user: AuthUser
}
