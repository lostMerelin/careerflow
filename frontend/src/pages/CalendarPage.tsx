import { CalendarView } from "@/widgets/calendar-view/CalendarView";

export function CalendarPage() {
  return(
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Календарь</h1>
        <p className="mt-1 text-muted-foreground">
          Собеседования и дедлайны задач в одном месте.
        </p>
      </div>
    <CalendarView />
    </div>
  )
}