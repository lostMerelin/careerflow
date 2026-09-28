import { useParams } from "react-router-dom";
import { useCoverLetter } from "@/entities/cover-letter/api/queries";
import { CoverLetterEditor } from "@/widgets/cover-letter-editor/CoverLetterEditor";

export function CoverLetterEditorPage() {
    const { id } = useParams<{ id: string }>()
    const { data: coverLetter, isLoading } = useCoverLetter(id!)

    if(isLoading || !coverLetter) {
        return <p className="text-muted-foreground">Загрузка...</p>
    }

    return <CoverLetterEditor key={coverLetter.id} coverLetter={coverLetter} />
}