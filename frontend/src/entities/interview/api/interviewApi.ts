import { api } from '@/shared/api/axios'
import type { Interview, InterviewInput } from '../model/types'

export async function fetchCompanies(): Promise<Interview[]> {
  const { data } = await api.get<Interview[]>('/api/v1/companies')
  return data
}

export async function createCompany(payload: InterviewInput): Promise<Interview> {
  const { data } = await api.post<Interview>('/api/v1/companies', payload)
  return data
}

export async function updateCompany(id: string, payload: Partial<InterviewInput>): Promise<Interview> {
  const { data } = await api.patch<Interview>(`/api/v1/companies/${id}`, payload)
  return data
}

export async function deleteCompany(id: string): Promise<void> {
  await api.delete(`/api/v1/companies/${id}`)
}