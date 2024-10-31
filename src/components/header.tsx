import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { sidebarOptions } from './app-sidebar'
import { ThemeToggle } from './theme/theme-toggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const breadcrumb = useMemo(() => {
    const menus = [...sidebarOptions.posts]

    return menus.find((menu) => pathname.includes(menu.url))?.title
  }, [pathname])

  return (
    <header className="border-b shadow-sm">
      <div className="flex h-16 items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Separator orientation="vertical" />

          <Breadcrumb>
            <BreadcrumbList>
              {isHome ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>Feed</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Feed</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}

              {breadcrumb && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="ml-auto flex items-center gap-2 max-md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
