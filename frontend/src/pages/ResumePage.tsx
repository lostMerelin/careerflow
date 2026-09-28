import { UploadResumeDialog } from "@/features/resume/upload-resume/UploadResumeDialog";
import { ResumeList } from "@/widgets/resume-list/ResumeList";
import { useResumes } from "@/entities/resume/api/queries";
import { ListSkeleton } from "@/shared/ui/skeletons";

export function ResumePage() {
  const { data: resumes, isLoading } = useResumes()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Резюме</h1>
          <p className="mt-1 text-muted-foreground">Храните разные версии рехюме в формате PDF.</p>
        </div>
        <UploadResumeDialog />
      </div>

      {isLoading ? (
        <ListSkeleton />
      ) : (
        <ResumeList resumes={resumes ?? []} />
      )}
    </div>
  )
}