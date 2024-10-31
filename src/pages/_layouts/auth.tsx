import { Link } from 'lucide-react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function AuthLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    const getToken = localStorage.getItem('token')

    if (getToken) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  return (
    <main className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Link className="h-4 w-4" />
          <span className="font-semibold">SocialLinx</span>
        </div>

        <footer className="text-sm">
          Painel &copy; SocialLinx - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </main>
  )
}
