import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/widgets/sidebar/Sidebar'
import { Navbar } from '@/widgets/navbar/Navbar'
import { PageSkeleton } from '@/shared/ui/skeletons'

export function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <Navbar />
        <main className="min-w-0 flex-1 p-6">
          <Suspense fallback={<PageSkeleton />}>
          <Outlet />
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}