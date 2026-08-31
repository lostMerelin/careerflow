import { CreateInterviewDialog } from '@/features/interviews/create-interview/CreateInterviewDialog'
import { InterviewsList } from '@/widgets/interviews-list/InterviewsList'
import { useInterviews } from '@/entities/interview/api/queries'

export function InterviewsPage() {
  const { data: interviews, isLoading } = useInterviews()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Interviews</h1>
          <p className="mt-1 text-muted-foreground">Keep track of every upcoming interview.</p>
        </div>
        <CreateInterviewDialog />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <InterviewsList interviews={interviews ?? []} />
      )}
    </div>
  )
}