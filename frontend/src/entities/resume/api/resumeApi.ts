import { api } from "@/shared/api/axios";
import type { ResumeFile } from "../model/types";

export async function fetchResumes(): Promise<ResumeFile[]> {
    const { data } = await api.get<ResumeFile[]>('/api/v1/resumes')
    return data
}

export async function uploadResume(file: File, label: string): Promise<ResumeFile> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('label', label)

    const { data } = await api.post<ResumeFile>('/api/v1/resumes', formData)
    return data
}

export async function downloadResume(id: string, filename: string): Promise<void> {
    const response = await api.get(`/api/v1/resumes/${id}/download`, { responseType: 'blob' })
    const url = URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
}

export async function deleteResume(id: string): Promise<void> {
    await api.delete(`/api/v1/resumes/${id}`)
}