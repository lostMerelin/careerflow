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
  { title: 'Вакансии', url: '/jobs', icon: Briefcase },
  { title: 'Компании', url: '/companies', icon: Building2 },
  { title: 'Собеседования', url: '/interviews', icon: CalendarClock },
  { title: 'Резюме', url: '/resume', icon: FileText },
  { title: 'Сопроводительное письмо', url: '/cover-letters', icon: Mail },
  { title: 'Задачи', url: '/tasks', icon: CheckSquare },
  { title: 'Календарь', url: '/calendar', icon: Calendar },
  { title: 'Аналитика', url: '/analytics', icon: BarChart3 },
  { title: 'Заметки', url: '/notes', icon: StickyNote },
]

export const bottomNavItems: NavItem[] = [
  { title: 'Профиль', url: '/profile', icon: User },
  { title: 'Настройки', url: '/settings', icon: Settings },
]