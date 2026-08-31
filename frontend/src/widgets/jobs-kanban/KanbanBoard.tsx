import { useState } from 'react'
import { DndContext, 
         DragOverlay,
         PointerSensor,
        useSensor,
        useSensors,
        type DragEndEvent,
        type DragStartEvent
} from '@dnd-kit/core'
import {statusOrder} from '@/entities/job/config/statusConfig'
import { KanbanCard } from './KanbanCard'
import { useUpdateJob } from '@/entities/job/api/queries'
import { KanbanColumn } from './KanbanColumn'
import type { Job, JobStatus } from '@/entities/job/model/types'

interface KanbanBoardProps{
    jobs : Job[]
}

export function KanbanBoard({jobs} : KanbanBoardProps) {
    const [activeJob, setActiveJob] = useState<Job | null>(null)
    const updateJob = useUpdateJob()

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    )

    const jobsByStatus = statusOrder.reduce<Record<JobStatus, Job[]>>(
        (acc, status) => {
        acc[status] = jobs.filter((job) => job.status === status)
        return acc
    }, {} as Record<JobStatus, Job[]>,
    )

    const handleDragStart = (event: DragStartEvent) => {
        const job = jobs.find((j) => j.id === event.active.id)
        setActiveJob(job ?? null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveJob(null)
        const { active, over } = event
        if (!over) return 

        const newStatus = over.id as JobStatus
        const job = jobs.find((j) => j.id === active.id)

        if(job && job.status !== newStatus){
            updateJob.mutate({id: job.id, payload: { status: newStatus } })
        }
    }

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
                {statusOrder.map((status) => (
                    <KanbanColumn key={status} status={status} jobs={jobsByStatus[status]} />
                ))}
            </div>
            <DragOverlay>{activeJob ? <KanbanCard job={activeJob} /> : null}</DragOverlay>
        </DndContext>
    )
}