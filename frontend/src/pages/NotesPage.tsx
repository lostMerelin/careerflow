import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { NotesList } from '@/widgets/notes-list/NotesList'
import { useCreateNote, useNotes } from '@/entities/note/api/queries'

export function NotesPage() {
    const navigate = useNavigate()
    const { data: notes, isLoading } = useNotes()
    const createNote = useCreateNote()

    const handleCreate = async () => {
        try {
            const note = await createNote.mutateAsync({})
            navigate(`/notes/${note.id}`)
        } catch {
            toast.error('Не удалось создать заметку')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Заметки</h1>
                    <p className="mt-1 text-muted-foreground">Ваш конспект в формате Markdown.</p>
                </div>
                <Button onClick={handleCreate} disabled={createNote.isPending}>
                    <Plus className="mr-2 h-4 w-4" />
                    Новая заметка
                </Button>
            </div>
            {isLoading ? (
                <p className="text-muted-foreground">Загрузка...</p>
            ) : (
                <NotesList notes={notes ?? []} />
            )}
        </div>
    )
}