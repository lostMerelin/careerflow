import { api } from '@/shared/api/axios'
import type { Interview, InterviewInput } from '../model/types'

export async function fetchInterviews(): Promise<Interview[]> {
  const { data } = await api.get<Interview[]>('/api/v1/interviews')
  return data
}

export async function createInterview(payload: InterviewInput): Promise<Interview> {
  const { data } = await api.post<Interview>('/api/v1/interviews', payload)
  return data
}

export async function updateInterview(
  id: string,
  payload: Partial<InterviewInput>,
): Promise<Interview> {
  const { data } = await api.patch<Interview>(`/api/v1/interviews/${id}`, payload)
  return data
}

export async function deleteInterview(id: string): Promise<void> {
  await api.delete(`/api/v1/interviews/${id}`)
}