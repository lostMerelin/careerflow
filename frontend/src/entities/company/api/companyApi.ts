import {api} from "@/shared/api/axios";
import type {Company, CompanyInput} from "../model/types";


export async function fetchCompanies(): Promise<Company[]> {
  const {data} = await api.get<Company[]>('/api/v1/companies');
  return data;
}

export async function createCompany(payload: CompanyInput): Promise<Company> {
  const {data} = await api.post<Company>('/api/v1/companies', payload);
  return data;
}

export async function updateCompany(id: string, payload: Partial<CompanyInput>): Promise<Company> {
  const {data} = await api.patch<Company>(`/api/v1/companies/${id}`, payload);
  return data;
}

export async function deleteCompany(id: string): Promise<void> {
  await api.delete(`/api/v1/companies/${id}`);
}