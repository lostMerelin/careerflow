import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Note } from '@/entities/note/model/types'
import { useDeleteNote } from '@/entities/note/api/queries'

interface NotesListProps {
    notes: Note[]
}

export function NotesList({ notes }: NotesListProps) {
    const deleteNote = useDeleteNote()

    if(notes.length === 0) {
        return (
            <div className="rounded-lg border p-12 text-center text-muted-foreground">
                Пока нет заметок. Добавьте первую!
            </div>
        )
    }

    return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link 
        key={note.id}
        to={`/notes/${note.id}`}
        className="group relative space-y-2 rounded-lg border bg-background p-4 transition-colors hover:border-primary">
            <div className="flex items-start justify-between gap-2">
                <p className="font-medium leading-tight">{note.title || 'Без названия'}</p>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                        e.preventDefault()
                        deleteNote.mutate(note.id)
                    }}
                >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">{new Date(note.updated_at).toLocaleDateString('ru-RU')}</p>
        </Link>
      ))}
    </div>
    )
}