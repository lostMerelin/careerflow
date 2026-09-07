import type { TaskPriority } from '../model/types'

export const priorityConfig: Record<TaskPriority, {label: string, className: string}> = {
    low: {label: 'Низкий', className: 'bg-slate-100 text-slate-800'},
    medium: {label: 'Средний', className: 'bg-amber-100 text-amber-800'},
    high: {label: 'Высокий', className: 'bg-red-100 text-red-800'}
}