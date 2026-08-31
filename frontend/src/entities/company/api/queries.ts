import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCompany, deleteCompany, fetchCompanies, updateCompany } from './companyApi'
import type { CompanyInput } from '../model/types'

const COMPANIES_KEY = ['companies']

export function useCompanies() {
  return useQuery({ queryKey: COMPANIES_KEY, queryFn: fetchCompanies })
}

export function useCreateCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CompanyInput) => createCompany(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COMPANIES_KEY }),
  })
}

export function useUpdateCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CompanyInput> }) =>
      updateCompany(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COMPANIES_KEY }),
  })
}

export function useDeleteCompany() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COMPANIES_KEY }),
  })
}