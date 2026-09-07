import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import toast from 'react-hot-toast'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateNote, useDeleteNote } from '@/entities/note/api/queries'
import type { Note } from '@/entities/note/model/types'

interface NoteEditorProps {
  note: Note
}

export function NoteEditor({ note }: NoteEditorProps) {
  const navigate = useNavigate()
  const updateNote = useUpdateNote()
  const deleteNote = useDeleteNote()

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleSave = async () => {
    try {
      await updateNote.mutateAsync({ id: note.id, payload: { title, content } })
      toast.success('Заметка сохранена')
    } catch {
      toast.error('Не удалось сохранить заметку')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteNote.mutateAsync(note.id)
      toast.success('Заметка удалена')
      navigate('/notes')
    } catch {
      toast.error('Не удалось удалить заметку')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          to="/notes"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Все заметки
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
          <Button onClick={handleSave} disabled={updateNote.isPending}>
            {updateNote.isPending ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </div>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название заметки"
        className="border-none px-0 text-2xl font-semibold shadow-none focus-visible:ring-0"
      />

      <div className="grid grid-cols-2 gap-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Пишите в формате Markdown..."
          className="min-h-[500px] resize-none font-mono text-sm"
        />
        <div className="min-h-[500px] rounded-md border p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: (props) => <h1 className="mb-2 mt-4 text-xl font-semibold" {...props} />,
              h2: (props) => <h2 className="mb-2 mt-3 text-lg font-semibold" {...props} />,
              h3: (props) => <h3 className="mb-1 mt-2 text-base font-semibold" {...props} />,
              p: (props) => <p className="mb-2 text-sm leading-relaxed" {...props} />,
              ul: (props) => <ul className="mb-2 list-disc space-y-1 pl-5 text-sm" {...props} />,
              ol: (props) => <ol className="mb-2 list-decimal space-y-1 pl-5 text-sm" {...props} />,
              li: (props) => <li {...props} />,
              a: (props) => <a className="text-primary underline" {...props} />,
              code: (props) => <code className="rounded bg-muted px-1 py-0.5 text-xs" {...props} />,
              blockquote: (props) => (
                <blockquote className="border-l-2 pl-3 text-sm text-muted-foreground" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}