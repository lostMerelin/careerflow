import { useState } from 'react'
import { CreateJobDialog } from '@/features/jobs/create-job/CreateJobDialog'
import { JobsTable } from '@/widgets/jobs-table/JobsTable'
import { KanbanBoard } from '@/widgets/jobs-kanban/KanbanBoard'
import { useJobs } from '@/entities/job/api/queries'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function JobsPage() {
  const { data: jobs, isLoading } = useJobs()
  const [view, setView] = useState<'table' | 'kanban'>('table')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Вакансии</h1>
          <p className="mt-1 text-muted-foreground">Отслеживайте каждое приложение в одном месте</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={view} onValueChange={(v) => setView(v as 'table' | 'kanban')}>
            <TabsList>
              <TabsTrigger value="table">Таблица</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
            </TabsList>
          </Tabs>
          <CreateJobDialog />
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : view === 'table' ? (
        <JobsTable jobs={jobs ?? []} />
      ) : (
        <KanbanBoard jobs={jobs ?? []} />
      )}
    </div>
  )
}