import { useJobs } from "@/entities/job/api/queries";
import { useInterviews } from "@/entities/interview/api/queries";
import { StatsCards } from "@/widgets/analytics/StatsCards";
import { StatusFunnelChart } from "@/widgets/analytics/StatusFunnelChart";
import { ApplicaitonsTrendChart } from "@/widgets/analytics/ApplicationsTrendChart";
import { InterviewResultChart } from "@/widgets/analytics/InterviewResultsChart";

export function AnalyticsPage(){
  const { data: jobs, isLoading: jobsLoading } = useJobs()
  const { data: interviews, isLoading: interviewsLoading } = useInterviews()

  if(jobsLoading || interviewsLoading) {
    return <p className="text-muted-foreground">Загрузка...</p>
  }

  const jobsData = jobs ?? []
  const interviewsData = interviews ?? []

  return(
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Аналитика</h1>
        <p className="mt-1 text-muted-foreground">Как продвигается ваш поиск работы.</p>
      </div>

      <StatsCards jobs={jobsData} interviews={interviewsData} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusFunnelChart jobs={jobsData} />
        <ApplicaitonsTrendChart jobs={jobsData} />
      </div>

      <InterviewResultChart interviews={interviewsData} />
    </div>
  )
}