import { create } from 'zustand'

export interface User {
    id: string
    email: string
    full_name: string | null
}

interface UserState {
    user: User | null
    isAuthLoading: boolean
    setUser: (user: User) => void
    clearUser: () => void
    setAuthLoading: (value: boolean) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    isAuthLoading: true,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setAuthLoading: (value) => set ({ isAuthLoading: value}),
}))