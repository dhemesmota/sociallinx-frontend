import { useQuery } from '@tanstack/react-query'
import { List } from 'lucide-react'
import * as React from 'react'

import { getProfile } from '@/api/get-profile'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { useProfileStore } from '@/hooks/use-profile'

import { NavAccount } from './nav-account'
import { NavMenu } from './nav-menu'
import { Skeleton } from './ui/skeleton'

// This is sample data.
export const sidebarOptions = {
  teams: [
    {
      name: 'SocialLinx',
      logo: '',
      plan: 'Sua rede social',
    },
  ],
  posts: [
    {
      title: 'Posts',
      url: '/feed',
      icon: List,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setUser } = useProfileStore((state) => state)

  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    isError,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    retry: false,
  })

  React.useEffect(() => {
    if (userProfile) {
      setUser(userProfile)
    }
  }, [setUser, userProfile])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarOptions.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMenu items={sidebarOptions.posts} />
      </SidebarContent>
      <SidebarFooter>
        {isLoadingProfile && !isError ? (
          <Skeleton className="h-4 w-40" />
        ) : (
          <NavAccount user={userProfile} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
