import { useParams } from 'react-router-dom'
import { useNote } from '@/entities/note/api/queries'
import { NoteEditor } from '@/widgets/note-editor/NoteEditor'
import { PageSkeleton } from '@/shared/ui/skeletons'

export function NoteEditorPage() {
  const { id } = useParams<{ id: string }>()
  const { data: note, isLoading } = useNote(id!)

  if (isLoading || !note) {
    return <PageSkeleton />
  }

  return <NoteEditor key={note.id} note={note} />
}