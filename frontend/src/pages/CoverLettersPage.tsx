import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { CoverLettersList } from "@/widgets/cover-letters-list/CoverLettersList";
import { useCoverLetters, useCreateCoverLetter } from "@/entities/cover-letter/api/queries";
import { CardGridSkeleton } from "@/shared/ui/skeletons";

export function CoverLettersPage () {
  const navigate = useNavigate()
  const { data: coverLetters, isLoading } = useCoverLetters()
  const createCoverLetter = useCreateCoverLetter()

  const handleCreate = async () => {
    try {
      const letter = await createCoverLetter.mutateAsync({})
      navigate(`/cover-letters/${letter.id}`)
    } catch {
      toast.error('Не удалось создать шаблон')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Сопроводительные письма</h1>
          <p className="mt-1 text-muted-foreground">Шаблоны для быстрого отклика на вакансии.</p>
        </div>
        <Button onClick={handleCreate} disabled={createCoverLetter.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          Новый шаблон
        </Button>
      </div>

      {isLoading ? (
        <CardGridSkeleton />
      ) : (
        <CoverLettersList coverLetters={coverLetters ?? []} />
      )}
    </div>
  )
}