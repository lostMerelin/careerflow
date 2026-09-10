import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns' 
import { ru } from 'date-fns/locale'
import { Briefcase, CalendarClock, CheckSquare, StickyNote } from 'lucide-react'
import type { Job } from '@/entities/job/model/types'
import type { Interview } from '@/entities/interview/model/types'
import type { Task } from '@/entities/task/model/types'
import type { Note } from '@/entities/note/model/types'

interface RecentActivityProps {
    jobs: Job[]
    interviews: Interview[]
    tasks: Task[]
    notes: Note[]
}

export function RecentActivity({ jobs, interviews, tasks, notes }: RecentActivityProps) {
    const items =[
        ...jobs.map((job) => ({
            id: `job-${job.id}`,
            date: new Date(job.updated_at),
            icon: Briefcase,
            iconColor: 'text-blue-600 bg-blue-100',
            title: job.position,
            subtitle: job.company,
            link: '/jobs',
        })),
        ...interviews.map((interview) => ({
            id: `interview-${interview.id}`,
            date: new Date(interview.updated_at),
            icon: CalendarClock,
            iconColor: 'text-purple-600 bg-purple-100',
            title: interview.company,
            subtitle: interview.position ?? 'Собеседование',
            link: '/interviews',
        })),
        ...tasks.map((task) => ({
            id: `task-${task.id}`,
            date: new Date(task.updated_at),
            icon: CheckSquare,
            iconColor: 'text-amber-600 bg-amber-100',
            title: task.title,
            subtitle: task.is_done ? 'Выполнено' : 'Задача',
            link: '/tasks'
        })),
        ...notes.map((note) => ({
            id: `note-${note.id}`,
            date: new Date(note.updated_at),
            icon: StickyNote,
            iconColor: 'text-emerald-600 bg-emerald-100',
            title: note.title || 'Без названия',
            subtitle: 'Заметка',
            link: `/notes/${note.id},`
        })),
    ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8)

    if(items.length === 0) {
        return (
            <div className='rounded-lg border bg-background p-8 text-center text-sm text-muted-foreground'>
                Пока нет активностей
            </div>
        )
    }

    return (
        <div className='rounded-lg border bg-background'>
            {items.map((item, index) => (
                <Link
                key={item.id}
                to={item.link}
                className={`flex items-center gap-3 p-3 hover:bg-muted/50 ${index !== items.length - 1 ? 'border-b' : ''}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${item.iconColor}`}>
                        <item.icon className='h-4 w-4' />
                    </div>
                    <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium'>{item.title}</p>
                        <p className='truncate text-xs text-muted-foreground'>{item.subtitle}</p>
                    </div>
                    <span className='shrink-0 text-xs text-muted-foreground'>
                        {formatDistanceToNow(item.date, {locale: ru, addSuffix: true})}
                    </span>
                </Link>
            ))}
        </div>
    )
}