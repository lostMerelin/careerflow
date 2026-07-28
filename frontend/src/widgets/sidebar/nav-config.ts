import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Briefcase,
  Building2,
  CalendarClock,
  FileText,
  Mail,
  CheckSquare,
  Calendar,
  BarChart3,
  StickyNote,
  User,
  Settings,
} from 'lucide-react'

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Jobs', url: '/jobs', icon: Briefcase },
  { title: 'Companies', url: '/companies', icon: Building2 },
  { title: 'Interviews', url: '/interviews', icon: CalendarClock },
  { title: 'Resume', url: '/resume', icon: FileText },
  { title: 'Cover Letters', url: '/cover-letters', icon: Mail },
  { title: 'Tasks', url: '/tasks', icon: CheckSquare },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
  { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  { title: 'Notes', url: '/notes', icon: StickyNote },
]

export const bottomNavItems: NavItem[] = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
]