import { Link } from 'react-router-dom'
import { CalendarClock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Interview } from '@/entities/interview/model/types'
import { stageLabels } from '@/entities/interview/config/labels'

interface UpComingInterviewsProps {
    interviews: Interview[] 
}

export function UpComingInterviews({interviews} : UpComingInterviewsProps) {
    const upcoming = interviews.filter((interview) => new Date(interview.scheduled_at) >= new Date())
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()).slice(0, 5)

    return(
        <div className='rounded-lg border bg-background p-4'>
            <h3 className='mb-3 text-sm font-medium'>Ближайшие собеседования</h3>
            {upcoming.length === 0 ? (
                <p className='text-sm text-muted-foreground'>Нет заланированных собеседований</p>
            ) : (
                <div className='space-y-2'>
                    {upcoming.map((interview) => (
                        <Link
                        key={interview.id}
                        to='/interviews'
                        className='flex items-start gap-2 rounded-md p-2 hover:bg-muted/50'
                        >
                            <CalendarClock className='mt-0.5 h-4 w-4 shrink-0 text-purple-600' />
                            <div className='min-w-0 flex-1'>
                                <p className='truncate text-sm font-medium'>{interview.company}</p>
                                <p className='text-xs text-muted-foreground'>
                                    {new Date(interview.scheduled_at).toLocaleString('ru-Ru', {
                                        day: 'numeric',
                                        month: 'short',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <Badge variant="secondary" className='shrink-0 text-[10px]'>
                                {stageLabels[interview.stage]}
                            </Badge>
                        </Link>
                    ))}
                    </div>
            )}
        </div>
    )
}