import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { api } from '@/shared/api/axios'
import { tokenStorage } from '@/shared/lib/token'
import { useUserStore } from '@/entities/user/model/store'

const queryClient = new QueryClient()

function AuthBootstrap({ children }: PropsWithChildren) {
  const setUser = useUserStore((state) => state.setUser)
  const setAuthLoading = useUserStore((state) => state.setAuthLoading)
  const isAuthLoading = useUserStore((state) => state.isAuthLoading)

  useEffect(() => {
    const token = tokenStorage.get()
    if (!token) {
      setAuthLoading(false)
      return
    }

    api
      .get('/api/v1/auth/me')
      .then(({ data }) => setUser(data))
      .catch(() => tokenStorage.clear())
      .finally(() => setAuthLoading(false))
  }, [setUser, setAuthLoading])

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Загрузка...
      </div>
    )
  }

  return <>{children}</>
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthBootstrap>{children}</AuthBootstrap>
        <Toaster position="top-right" />
      </HelmetProvider>
    </QueryClientProvider>
  )
}