import { api } from '@/shared/api/axios'
import type { User } from '../model/store'

export async function fetchCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/api/v1/auth/me')
    return data
}