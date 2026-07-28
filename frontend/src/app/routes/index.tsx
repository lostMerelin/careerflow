import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/app/layouts/MainLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { JobsPage } from '@/pages/JobsPage'
import { CompaniesPage } from '@/pages/CompaniesPage'
import { InterviewsPage } from '@/pages/InterviewsPage'
import { ResumePage } from '@/pages/ResumePage'
import { CoverLettersPage } from '@/pages/CoverLettersPage'
import { TasksPage } from '@/pages/TasksPage'
import { CalendarPage } from '@/pages/CalendarPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'
import { NotesPage } from '@/pages/NotesPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { SettingsPage } from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'jobs', element: <JobsPage /> },
      { path: 'companies', element: <CompaniesPage /> },
      { path: 'interviews', element: <InterviewsPage /> },
      { path: 'resume', element: <ResumePage /> },
      { path: 'cover-letters', element: <CoverLettersPage /> },
      { path: 'tasks', element: <TasksPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])