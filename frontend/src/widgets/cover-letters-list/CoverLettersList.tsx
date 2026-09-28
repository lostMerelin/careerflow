import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Copy, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge"; 
import { Button } from "@/components/ui/button";
import type { CoverLetter } from "@/entities/cover-letter/model/types";
import { useDeleteCoverLetter } from "@/entities/cover-letter/api/queries";

interface CoverLettersListProps {
    coverLetters: CoverLetter[]
}

export function CoverLettersList({ coverLetters }: CoverLettersListProps) {
    const deleteCoverLetter = useDeleteCoverLetter()

    const handleCopy = async (e: React.MouseEvent, content: string) => {
        e.preventDefault()
        await navigator.clipboard.writeText(content)
        toast.success('Скопировано в буфер обмена')
    }

    if (coverLetters.length === 0) {
        return (
            <div className="rounded-lg border p-12 text-center text-muted-foreground">
                Пока нет шаблонов. Создайте первый!
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coverLetters.map((letter) => (
                <Link 
                key={letter.id}
                to={`/cover-letters/${letter.id}`}
                className="group relative space-y-2 rounded-lg border bg-background p-4 transition-colors hover:border-primary">
                    <div className="flex items-start justify-between gap-2">
                        <p className="font-medium leading-tight">{letter.title || 'Без названия'}</p>
                        <div className="flex shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                            variant='ghost'
                            size='icon'
                            className='h-7 w-7'
                            onClick={(e) => handleCopy(e, letter.content)}
                            >
                                <Copy className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                            variant='ghost'
                            size='icon'
                            className='h-7 w-7'
                            onClick={(e) => {
                                e.preventDefault()
                                deleteCoverLetter.mutate(letter.id)
                            }}
                            >
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                            </Button>
                        </div>
                    </div>
                    <Badge variant='secondary' className="text-[10px]">
                        {letter.category}
                    </Badge>
                    <p className="line-clamp-3 text-sm text-muted-foreground"></p>
                </Link>
            ))}
        </div>
    )
}