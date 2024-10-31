import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useProfileStore } from '@/hooks/use-profile'
import { api } from '@/lib/axios'

const adminRoutes = ['/users', '/curators']

export function AppLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { user } = useProfileStore((state) => state)

  useEffect(() => {
    if (user?.role !== 'admin' && adminRoutes.includes(pathname)) {
      navigate('/404', { replace: true })
    }
  }, [pathname, user, navigate])

  useEffect(() => {
    const getToken = localStorage.getItem('token')

    if (getToken) {
      api.defaults.headers.common.Authorization = `Bearer ${getToken}`
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.status || error.response?.status
          const code = error.response?.data?.error || error.response?.statusText

          if (status === 401 || code === 'Unauthorized') {
            localStorage.removeItem('token')
            navigate('/sign-in', { replace: true })
          } else {
            return Promise.reject(error)
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col antialiased">
        <Header />

        <main className="flex flex-1 flex-col gap-4 overflow-x-auto p-8 pt-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
