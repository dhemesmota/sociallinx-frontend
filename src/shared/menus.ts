import { LayoutDashboard, MonitorCheck, Users } from 'lucide-react'

export const menus = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    to: '/',
  },
  {
    icon: MonitorCheck,
    label: 'Curadoria',
    to: '/curation',
  },
  {
    icon: Users,
    label: 'Curadores',
    to: '/curators',
  },
]
