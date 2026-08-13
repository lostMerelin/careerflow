import { CreateJobDialog } from '@/features/jobs/create-job/CreateJobDialog'
import { JobsTable } from '@/widgets/jobs-table/JobsTable'
import { useJobs } from '@/entities/job/api/queries'

export function JobsPage() {
  const { data: jobs, isLoading } = useJobs()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground mt-1">
            Track every application in one place.
          </p>
        </div>
        <CreateJobDialog />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <JobsTable jobs={jobs ?? []} />
      )}
    </div>
  )
}