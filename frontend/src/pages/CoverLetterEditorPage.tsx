import { useParams } from "react-router-dom";
import { useCoverLetter } from "@/entities/cover-letter/api/queries";
import { CoverLetterEditor } from "@/widgets/cover-letter-editor/CoverLetterEditor";
import { PageSkeleton } from "@/shared/ui/skeletons";

export function CoverLetterEditorPage() {
    const { id } = useParams<{ id: string }>()
    const { data: coverLetter, isLoading } = useCoverLetter(id!)

    if(isLoading || !coverLetter) {
        return <PageSkeleton />
    }

    return <CoverLetterEditor key={coverLetter.id} coverLetter={coverLetter} />
}