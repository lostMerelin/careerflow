import { api } from '@/shared/api/axios'
import type { User } from '../model/store'

export async function fetchCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/api/v1/auth/me')
    return data
}

export interface UserProfileInput {
    last_name?: string
    first_name?: string
    patronymic?: string
    phone?: string
    experience?: string
    github_url?: string
    linkedin_url?: string
    telegram_url?: string
}

export async function updateProfile(payload: UserProfileInput): Promise<User> {
    const { data } = await api.patch<User>('/api/v1/auth/me', payload)
    return data
}

export async function exportUserData(): Promise<unknown> {
    const {data} = await api.get('/api/v1/account/export')
    return data
}

export async function deleteAccount(): Promise<void> {
    await api.delete('/api/v1/account')
}