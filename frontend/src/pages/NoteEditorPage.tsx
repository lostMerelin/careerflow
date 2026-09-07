import { useParams } from 'react-router-dom'
import { useNote } from '@/entities/note/api/queries'
import { NoteEditor } from '@/widgets/note-editor/NoteEditor'

export function NoteEditorPage() {
  const { id } = useParams<{ id: string }>()
  const { data: note, isLoading } = useNote(id!)

  if (isLoading || !note) {
    return <p className="text-muted-foreground">Загрузка...</p>
  }

  return <NoteEditor key={note.id} note={note} />
}