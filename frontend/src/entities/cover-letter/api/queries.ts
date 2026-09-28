import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CoverLetterInput } from "../model/types";
import { createCoverLetter, deleteCoverLetter, fetchCoverLetter, fetchCoverLetters, updateCoverLetter } from "./coverLetterApi";

const COVER_LETTERS_KEY = ['cover-letters']

export function useCoverLetters() {
    return useQuery({ queryKey: COVER_LETTERS_KEY, queryFn: fetchCoverLetters })
}

export function useCoverLetter(id: string) {
  return useQuery({ queryKey: [...COVER_LETTERS_KEY, id], queryFn: () => fetchCoverLetter(id), enabled: !!id })
}

export function useCreateCoverLetter() {
    const queryClient = useQueryClient()
    return useMutation ({ 
        mutationFn: (payload: CoverLetterInput) => createCoverLetter(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: COVER_LETTERS_KEY }),
    })
}

export function useUpdateCoverLetter() {
    const queryClient = useQueryClient()
    return useMutation ({ 
        mutationFn: ({ id, payload }: { id: string; payload: Partial<CoverLetterInput> }) => updateCoverLetter(id, payload),
        onSuccess: (_data, variables) => { 
            queryClient.invalidateQueries({ queryKey: COVER_LETTERS_KEY })
            queryClient.invalidateQueries({ queryKey: [...COVER_LETTERS_KEY, variables.id] })
         }
    })
}

export function useDeleteCoverLetter() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteCoverLetter(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: COVER_LETTERS_KEY }),
    })
}