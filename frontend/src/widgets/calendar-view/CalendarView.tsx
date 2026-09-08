import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { isSameDay, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarClock, CheckSquare } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { useInterviews } from '@/entities/interview/api/queries'
import { useTasks } from '@/entities/task/api/queries'

interface CalendarEvent {
  id: string
  date: Date
  type: 'interview' | 'task'
  title: string
  subtitle?: string
  link: string
}

export function CalendarView() {
  const { data: interviews } = useInterviews()
  const { data: tasks } = useTasks()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const events = useMemo<CalendarEvent[]>(() => {
    const interviewEvents: CalendarEvent[] = (interviews ?? []).map((interview) => ({
      id: `interview-${interview.id}`,
      date: parseISO(interview.scheduled_at),
      type: 'interview',
      title: interview.company,
      subtitle: interview.position ?? undefined,
      link: '/interviews',
    }))

    const taskEvents: CalendarEvent[] = (tasks ?? [])
      .filter((task) => task.due_date && !task.is_done)
      .map((task) => ({
        id: `task-${task.id}`,
        date: parseISO(task.due_date as string),
        type: 'task',
        title: task.title,
        link: '/tasks',
      }))

    return [...interviewEvents, ...taskEvents]
  }, [interviews, tasks])

  const eventDates = useMemo(() => events.map((event) => event.date), [events])

  const selectedDayEvents = selectedDate
    ? events.filter((event) => isSameDay(event.date, selectedDate))
    : []

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        locale={ru}
        modifiers={{ hasEvent: eventDates }}
        modifiersClassNames={{ hasEvent: 'font-semibold underline underline-offset-4' }}
        className="rounded-lg border"
      />

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          {selectedDate
            ? selectedDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Выберите дату'}
        </h2>

        {selectedDayEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">Нет событий на этот день.</p>
        ) : (
          <div className="space-y-2">
            {selectedDayEvents.map((event) => (
              <Link
                key={event.id}
                to={event.link}
                className="flex items-center gap-3 rounded-lg border bg-background p-3 hover:border-primary"
              >
                {event.type === 'interview' ? (
                  <CalendarClock className="h-4 w-4 shrink-0 text-purple-600" />
                ) : (
                  <CheckSquare className="h-4 w-4 shrink-0 text-amber-600" />
                )}
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  {event.subtitle && (
                    <p className="text-xs text-muted-foreground">{event.subtitle}</p>
                  )}
                </div>
                <Badge variant="secondary" className="ml-auto text-[10px]">
                  {event.type === 'interview' ? 'Собеседование' : 'Задача'}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}