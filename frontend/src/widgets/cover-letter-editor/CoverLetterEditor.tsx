import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateCoverLetter, useDeleteCoverLetter } from "@/entities/cover-letter/api/queries";
import type { CoverLetter } from "@/entities/cover-letter/model/types";

const suggestedCategories = ['Frontend', 'Staptup', 'Product', 'Outsource', 'Bank']

interface CoverLetterEditorProps {
    coverLetter: CoverLetter
}

export function CoverLetterEditor({ coverLetter }: CoverLetterEditorProps) {
    const navigate = useNavigate()
    const updateCoverLetter = useUpdateCoverLetter()
    const deleteCoverLetter = useDeleteCoverLetter()

    const [title, setTitle] = useState(coverLetter.title)
    const [category, setCategory] = useState(coverLetter.category)
    const [content, setContent] = useState(coverLetter.content)

    const handleSave = async () => {
        try {
            await updateCoverLetter.mutateAsync({
                id: coverLetter.id,
                payload: { title, category, content },
            })
            toast.success('Шаблон сохранен')
        } catch {
            toast.error('Не удалось сохранить шаблон')
        }
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content)
        toast.success('Скопировано в буфер обмена')
    }

    const handleDelete = async () => {
        try {
            await deleteCoverLetter.mutateAsync(coverLetter.id)
            toast.success('Шаблон удален')
            navigate('/cover-letters')
        } catch {
            toast.error('Не удалось удалить шаблон')
        }
    }

    return (
        <div className="max-w-3xl space-y-4">
            <div className="flex items-center justify-between">
                <Link
                to='/cover-letters'
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Все шаблоны
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant='outline' size='icon' onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant='outline' size='icon' onClick={handleDelete}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <Button onClick={handleSave} disabled={updateCoverLetter.isPending}>
                        {updateCoverLetter.isPending ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </div>
            </div>

            <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название шаблона"
            className="border-none px-0 text-2xl font-semibold shadow-none in-focus-visible:ring-0" 
            />

            <div className="space-y-1.5">
                <Input 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Категория"
                className="max-w-xs"
                />
                <div className="flex flex-wrap gap-1.5">
                    {suggestedCategories.map((suggestion) => (
                        <button
                        key={suggestion}
                        type="button"
                        onClick={() => setCategory(suggestion)}
                        className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground hover:border-primary hover:text-primary">
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Текст сопроводительного письма..."
            className="min-h-[400px] resize-none" />
        </div>
    )
}