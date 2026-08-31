import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCreateJob } from '@/entities/job/api/queries'
import { statusConfig, statusOrder } from '@/entities/job/config/statusConfig'

const jobSchema = z.object({
  company: z.string().min(1, 'Укажите компанию'),
  position: z.string().min(1, 'Укажите должность'),
  salary: z.string().optional(),
  location: z.string().optional(),
  link: z.string().optional(),
  status: z.enum([
    'wishlist',
    'applied',
    'hr_contacted',
    'interview',
    'technical_interview',
    'test_task',
    'offer',
    'rejected',
    'accepted',
  ]),
  notes: z.string().optional(),
})

type JobFormValues = z.infer<typeof jobSchema>

export function CreateJobDialog() {
  const [open, setOpen] = useState(false)
  const createJob = useCreateJob()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: { status: 'wishlist' },
  })

  const onSubmit = async (values: JobFormValues) => {
    try {
      await createJob.mutateAsync(values)
      toast.success('Вакансия добавлена')
      reset()
      setOpen(false)
    } catch {
      toast.error('Не удалось добавить вакансию')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" />
        Новая вакансия
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить вакансию</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Компания</Label>
              <Input {...register('company')} />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Должность</Label>
              <Input {...register('position')} />
              {errors.position && (
                <p className="text-sm text-destructive">{errors.position.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Зарплата</Label>
              <Input placeholder="150 000 - 200 000 ₽" {...register('salary')} />
            </div>
            <div className="space-y-1.5">
              <Label>Локация</Label>
              <Input placeholder="Москва" {...register('location')} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Ссылка на вакансию</Label>
            <Input placeholder="https://..." {...register('link')} />
          </div>
          <div className="space-y-1.5">
            <Label>Статус</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOrder.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusConfig[status].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Заметки</Label>
            <Textarea rows={3} {...register('notes')} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Добавление...' : 'Добавить вакансию'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}