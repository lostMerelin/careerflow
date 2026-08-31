import { CalendarClock, Link as LinkIcon, MapPin, Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Interview } from '@/entities/interview/model/types'
import { stageLabels, resultLabels } from '@/entities/interview/config/labels'
import { useDeleteInterview } from '@/entities/interview/api/queries'

interface InterviewsListProps {
  interviews: Interview[]
}

export function InterviewsList({ interviews }: InterviewsListProps) {
  const deleteInterview = useDeleteInterview()

  if (interviews.length === 0) {
    return (
      <div className="rounded-lg border p-12 text-center text-muted-foreground">
        No interviews scheduled yet.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {interviews.map((interview) => {
        const date = new Date(interview.scheduled_at)
        return (
          <div
            key={interview.id}
            className="flex items-start justify-between rounded-lg border bg-background p-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="font-medium">{interview.company}</p>
                {interview.position && (
                  <span className="text-sm text-muted-foreground">· {interview.position}</span>
                )}
                <Badge variant="secondary">{stageLabels[interview.stage]}</Badge>
                <Badge variant="secondary" className={resultLabels[interview.result].className}>
                  {resultLabels[interview.result].label}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  {date.toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {interview.type === 'online' ? 'Online' : 'Offline'}
                </span>
                {interview.interviewer && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {interview.interviewer}
                  </span>
                )}
                {interview.meeting_link && (
                    <a
                    href={interview.meeting_link}
                    target='_blank'
                    rel="noreferrer"
                    className='flex items-center gap-1 hover:text-primary'
                    >
                        <LinkIcon className='h-3 w-3' />
                        Присоединиться по ссылке
                    </a>
                )}
                
              </div>
              {interview.notes && (
                <p className="text-sm text-muted-foreground">{interview.notes}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteInterview.mutate(interview.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}