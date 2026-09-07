import { Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Task } from '@/entities/task/model/types'
import { priorityConfig } from '@/entities/task/config/priorityConfig'
import { useUpdateTask, useDeleteTask } from '@/entities/task/api/queries'

interface TaskListProps {
    tasks: Task[]
}

export function TasksList({ tasks }: TaskListProps) {
    const updateTask = useUpdateTask()
    const deleteTask = useDeleteTask()

    if(tasks.length === 0) {
        return (
            <div className="rounded-lg border p-12 text-center text-muted-foreground">
                Пока нет задач. Добавьте первую!
            </div>
        )
    }

    return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start gap-3 rounded-lg border bg-background p-3"
        >
          <Checkbox
            checked={task.is_done}
            onCheckedChange={(checked) =>
              updateTask.mutate({ id: task.id, payload: { is_done: checked === true } })
            }
            className="mt-1"
          />
          <div className="flex-1 space-y-1">
            <p
              className={
                task.is_done
                  ? 'text-sm font-medium text-muted-foreground line-through'
                  : 'text-sm font-medium'
              }
            >
              {task.title}
            </p>
            {task.description && (
              <p className="text-sm text-muted-foreground">{task.description}</p>
            )}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={priorityConfig[task.priority].className}>
                {priorityConfig[task.priority].label}
              </Badge>
              {task.due_date && (
                <span className="text-xs text-muted-foreground">
                  до {new Date(task.due_date).toLocaleDateString('ru-RU')}
                </span>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => deleteTask.mutate(task.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
    </div>
  )
}