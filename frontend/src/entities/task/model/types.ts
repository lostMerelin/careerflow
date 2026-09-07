export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
    id: string
    title: string
    description: string
    due_date: string | null
    priority: TaskPriority
    is_done: boolean
    created_at: string
    updated_at: string
}

export interface TaskInput {
    title: string
    description?: string | null
    due_date?: string | null
    priority?: TaskPriority
    is_done?: boolean
}