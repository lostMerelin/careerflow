import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTask, deleteTask, fetchTasks, updateTask } from './taskApi'
import type { TaskInput } from '../model/types'

const TASKS_KEY = ['tasks']

export function useTasks() {
    return useQuery({queryKey: TASKS_KEY, queryFn: fetchTasks})
}

export function useCreateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: TaskInput) => createTask(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: TASKS_KEY})
    })
}

export function useUpdateTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({id, payload}: {id: string, payload: Partial<TaskInput>}) => updateTask(id, payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: TASKS_KEY})
    })
}

export function useDeleteTask() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => deleteTask(id),
        onSuccess: () => queryClient.invalidateQueries({queryKey: TASKS_KEY})
    })
}