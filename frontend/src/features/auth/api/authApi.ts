import { api } from '@/shared/api/axios'

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
  email: string
  password: string
  last_name: string
  first_name: string
  patronymic?: string
  phone?: string
}

interface TokenResponse {
    access_token: string
    token_type: string
}

export async function loginRequest(payload: LoginPayload): Promise<TokenResponse> {
    const formData = new URLSearchParams()
    formData.append('username', payload.email)
    formData.append('password', payload.password)

    const { data } = await api.post<TokenResponse>('api/v1/auth/login', formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
    return data
}

export async function registerRequest(payload: RegisterPayload) {
  const { data } = await api.post('api/v1/auth/register', payload)
  return data
}