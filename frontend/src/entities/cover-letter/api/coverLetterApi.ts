import { api } from "@/shared/api/axios";
import type { CoverLetter, CoverLetterInput } from "../model/types";

export async function fetchCoverLetters(): Promise<CoverLetter[]> {
    const { data } = await api.get<CoverLetter[]>('/api/v1/cover-letters')
    return data
}

export async function fetchCoverLetter(id: string): Promise<CoverLetter> {
    const { data} = await api.get<CoverLetter>(`/api/v1/cover-letters/${id}`)
    return data
}

export async function createCoverLetter(payload: CoverLetterInput): Promise<CoverLetter> {
    const { data } = await api.post<CoverLetter>('/api/v1/cover-letters', payload)
    return data
}

export async function updateCoverLetter(id: string, payload: Partial<CoverLetterInput>,): Promise<CoverLetter> {
    const { data } = await api.patch<CoverLetter>(`/api/v1/cover-letters/${id}`, payload)
    return data
}

export async function deleteCoverLetter(id: string): Promise<void> {
    await api.delete(`/api/v1/cover-letters/${id}`)
}