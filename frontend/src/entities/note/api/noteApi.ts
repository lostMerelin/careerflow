import { api }  from '@/shared/api/axios'
import type { Note, NoteInput } from '../model/types'

export async function fetchNotes(): Promise<Note[]> {
    const { data } = await api.get<Note[]>('/api/v1/notes')
    return data
}

export async function fetchNote(id: string): Promise<Note> {
    const { data } = await api.get<Note>(`/api/v1/notes/${id}`)
    return data
}

export async function createNote(payload: NoteInput): Promise<Note> {
    const { data } = await api.post<Note>('/api/v1/notes', payload)
    return data
}

export async function updateNote(id: string, payload: Partial<NoteInput>): Promise<Note> {
    const { data } = await api.patch<Note>(`/api/v1/notes/${id}`, payload)
    return data
}

export async function deleteNote(id: string): Promise<void> {
    await api.delete(`/api/v1/notes/${id}`)
}