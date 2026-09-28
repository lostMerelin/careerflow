import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import toast, { Toaster } from 'react-hot-toast'
import { api } from '@/shared/api/axios'
import { tokenStorage } from '@/shared/lib/token'
import { useUserStore } from '@/entities/user/model/store'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if(axios.isAxiosError(error) && error.response?.status === 401) 
        return toast.error('Не удалось загрузить данные. Проверьте соединение.', {id: 'query-error'})
    }
  })
})

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