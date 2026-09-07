import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, deleteNote, fetchNote, fetchNotes, updateNote } from './noteApi'
import type { NoteInput } from '../model/types'

const NOTES_KEY = ['notes']

export function useNotes() {
    return useQuery({queryKey: NOTES_KEY, queryFn: fetchNotes})
}

export function useNote(id: string) {
    return useQuery({queryKey: [...NOTES_KEY, id], queryFn: () => fetchNote(id), enabled: !!id})
}

export function useCreateNote() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: NoteInput) => createNote(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: NOTES_KEY})
    })
}

export function useUpdateNote() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, payload}: {id: string, payload: Partial<NoteInput>}) => updateNote(id, payload),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({queryKey: NOTES_KEY})
            queryClient.invalidateQueries({queryKey: [...NOTES_KEY, variables.id]})
        },
    })
}

export function useDeleteNote() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteNote(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: NOTES_KEY}),
    })
}