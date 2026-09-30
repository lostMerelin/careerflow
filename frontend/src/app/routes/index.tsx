/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/app/layouts/MainLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { RouteError } from './RouteError'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const JobsPage = lazy(() =>
  import('@/pages/JobsPage').then((m) => ({ default: m.JobsPage })),
)
const CompaniesPage = lazy(() =>
  import('@/pages/CompaniesPage').then((m) => ({ default: m.CompaniesPage })),
)
const InterviewsPage = lazy(() =>
  import('@/pages/InterviewsPage').then((m) => ({ default: m.InterviewsPage })),
)
const ResumePage = lazy(() =>
  import('@/pages/ResumePage').then((m) => ({ default: m.ResumePage })),
)
const CoverLettersPage = lazy(() =>
  import('@/pages/CoverLettersPage').then((m) => ({ default: m.CoverLettersPage })),
)
const CoverLetterEditorPage = lazy(() =>
  import('@/pages/CoverLetterEditorPage').then((m) => ({ default: m.CoverLetterEditorPage })),
)
const TasksPage = lazy(() =>
  import('@/pages/TasksPage').then((m) => ({ default: m.TasksPage })),
)
const CalendarPage = lazy(() =>
  import('@/pages/CalendarPage').then((m) => ({ default: m.CalendarPage })),
)
const AnalyticsPage = lazy(() =>
  import('@/pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage })),
)
const NotesPage = lazy(() =>
  import('@/pages/NotesPage').then((m) => ({ default: m.NotesPage })),
)
const NoteEditorPage = lazy(() =>
  import('@/pages/NoteEditorPage').then((m) => ({ default: m.NoteEditorPage })),
)
const ProfilePage = lazy(() =>
  import('@/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            errorElement: <RouteError />,
            children: [
              { index: true, element: <Navigate to="/dashboard" replace /> },
              { path: 'dashboard', element: <DashboardPage /> },
              { path: 'jobs', element: <JobsPage /> },
              { path: 'companies', element: <CompaniesPage /> },
              { path: 'interviews', element: <InterviewsPage /> },
              { path: 'resume', element: <ResumePage /> },
              { path: 'cover-letters', element: <CoverLettersPage /> },
              { path: 'cover-letters/:id', element: <CoverLetterEditorPage /> },
              { path: 'tasks', element: <TasksPage /> },
              { path: 'calendar', element: <CalendarPage /> },
              { path: 'analytics', element: <AnalyticsPage /> },
              { path: 'notes', element: <NotesPage /> },
              { path: 'notes/:id', element: <NoteEditorPage /> },
              { path: 'profile', element: <ProfilePage /> },
              { path: 'settings', element: <SettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    loader: () => {
      throw new Response('Not Found', { status: 404 })
    },
    errorElement: <RouteError />,
  },
])