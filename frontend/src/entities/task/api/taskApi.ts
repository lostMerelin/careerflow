import { api }  from '@/shared/api/axios'
import type { Task, TaskInput } from '../model/types'

export async function fetchTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>('/api/v1/tasks')
    return data
}

export async function createTask(payload: TaskInput): Promise<Task> {
    const { data } = await api.post<Task>('/api/v1/tasks', payload)
    return data
}

export async function updateTask(id: string, payload: Partial<TaskInput>): Promise<Task> {
    const { data } = await api.patch<Task>(`/api/v1/tasks/${id}`, payload)
    return data
}

export async function deleteTask(id: string): Promise<void> {
    await api.delete(`/api/v1/tasks/${id}`)
}