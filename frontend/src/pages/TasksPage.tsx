import { CreateTaskDialog } from '@/features/tasks/create-task/CreateTaskDialog'
import { TasksList } from '@/widgets/tasks-list/TasksList'
import { useTasks } from '@/entities/task/api/queries'

export function TasksPage() {
  const { data: tasks, isLoading } = useTasks()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Задачи</h1>
          <p className="mt-1 text-muted-foreground">Планируйте подготовку и не забывайте дедлайны.</p>
        </div>
        <CreateTaskDialog />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Загрузка...</p>
      ) : (
        <TasksList tasks={tasks ?? []} />
      )}
    </div>
  )
}