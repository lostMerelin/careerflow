import { useMutation } from '@tanstack/react-query'
import { updateProfile, type UserProfileInput } from './userApi'
import { useUserStore } from '../model/store'

export function useUpdateProfile() {
  const setUser = useUserStore((state) => state.setUser)

  return useMutation({
    mutationFn: (payload: UserProfileInput) => updateProfile(payload),
    onSuccess: (user) => setUser(user),
  })
}