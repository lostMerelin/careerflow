import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createInterview, deleteInterview, fetchInterviews, updateInterview } from './interviewApi'
import type { InterviewInput } from '../model/types'

const INTERVIEWS_KEY = ['interviews']

export function useInterviews() {
  return useQuery({ queryKey: INTERVIEWS_KEY, queryFn: fetchInterviews })
}

export function useCreateInterview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: InterviewInput) => createInterview(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INTERVIEWS_KEY }),
  })
}

export function useUpdateInterview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<InterviewInput> }) =>
      updateInterview(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INTERVIEWS_KEY }),
  })
}

export function useDeleteInterview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteInterview(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: INTERVIEWS_KEY }),
  })
}