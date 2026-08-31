import { useDroppable } from '@dnd-kit/core'
import type { Job, JobStatus } from '@/entities/job/model/types'
import { statusConfig } from '@/entities/job/config/statusConfig'
import { KanbanCard } from './KanbanCard'

interface KanbanColumnProps {
  status: JobStatus
  jobs: Job[]
}

export function KanbanColumn({ status, jobs }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-lg border bg-muted/30 p-3 transition-colors ${
        isOver ? 'bg-muted' : ''
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-sm font-medium">{statusConfig[status].label}</span>
        <span className="text-xs text-muted-foreground">{jobs.length}</span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {jobs.map((job) => (
          <KanbanCard key={job.id} job={job} />
        ))}
        {jobs.length === 0 && (
          <p className="px-1 text-xs text-muted-foreground">Нет вакансий</p>
        )}
      </div>
    </div>
  )
}