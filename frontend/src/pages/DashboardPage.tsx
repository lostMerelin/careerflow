import { useUserStore } from "@/entities/user/model/store";
import { useJobs } from "@/entities/job/api/queries";
import { useInterviews } from "@/entities/interview/api/queries";
import { useTasks } from "@/entities/task/api/queries";
import { useNotes } from "@/entities/note/api/queries";
import { StatsCards } from "@/widgets/analytics/StatsCards";
import { ApplicaitonsTrendChart } from "@/widgets/analytics/ApplicationsTrendChart";
import { UpComingInterviews } from "@/widgets/dashboard/UpcomingInterviews";
import { RecentActivity } from "@/widgets/dashboard/RecentActivity";

function getGreeting(): string {
  const hour = new Date().getHours()
  if(hour < 6) return 'Доброй ночи'
  if (hour < 12) return 'Доброе утро'
  if(hour < 18) return 'Добрый день'
  return 'Добрый вечер'
}

export function DashboardPage() {
  const user = useUserStore((state) => state.user)
  const { data: jobs, isLoading: jobsLoading } = useJobs()
  const { data: interviews, isLoading: interviewsLoading } = useInterviews()
  const { data: tasks } = useTasks()
  const { data: notes } = useNotes()

  if(jobsLoading || interviewsLoading) {
    return <p className="text-muted-foreground">Загрузка...</p>
  }

  const jobsData = jobs ?? []
  const interviewsData = interviews ?? []
  const tasksData = tasks ?? []
  const notesData = notes ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {getGreeting()}, {user?.first_name ?? user?.email}
        </h1>
        <p className="mt-1 text-muted-foreground">Вот что происходит с вашим поиском работы.</p>
      </div>
      
      <StatsCards jobs={jobsData} interviews={interviewsData} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <ApplicaitonsTrendChart jobs={jobsData} />
        <UpComingInterviews interviews={interviewsData} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Последние действия</h2>
        <RecentActivity jobs={jobsData} interviews={interviewsData} tasks={tasksData} notes={notesData} />
      </div>
    </div>
  )
}