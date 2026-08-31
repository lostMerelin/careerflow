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
import { useCreateInterview } from '@/entities/interview/api/queries'
import { stageLabels } from '@/entities/interview/config/labels'

const interviewSchema = z.object({
  company: z.string().min(1, 'Укажите компанию'),
  position: z.string().optional(),
  date: z.string().min(1, 'Укажите дату'),
  time: z.string().min(1, 'Укажите время'),
  type: z.enum(['online', 'offline']),
  meetingLink: z.string().optional(),
  stage: z.enum(['hr', 'technical', 'final']),
  interviewer: z.string().optional(),
  notes: z.string().optional(),
})

type InterviewFormValues = z.infer<typeof interviewSchema>

export function CreateInterviewDialog() {
  const [open, setOpen] = useState(false)
  const createInterview = useCreateInterview()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: { type: 'online', stage: 'hr' },
  })

  const onSubmit = async (values: InterviewFormValues) => {
    try {
      await createInterview.mutateAsync({
        company: values.company,
        position: values.position || undefined,
        scheduled_at: `${values.date}T${values.time}:00`,
        type: values.type,
        meeting_link: values.meetingLink || undefined,
        stage: values.stage,
        interviewer: values.interviewer || undefined,
        notes: values.notes || undefined,
      })
      toast.success('Собеседование запланировано')
      reset()
      setOpen(false)
    } catch {
      toast.error('Не удалось запланировать собеседование')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Plus className="mr-2 h-4 w-4" />
        Новое собеседование
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule an interview</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Company</Label>
              <Input {...register('company')} />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Position</Label>
              <Input {...register('position')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Date</Label>
              <Input type="date" {...register('date')} />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Time</Label>
              <Input type="time" {...register('time')} />
              {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Stage</Label>
              <Controller
                control={control}
                name="stage"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(stageLabels).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Meeting link</Label>
            <Input placeholder="https://zoom.us/..." {...register('meetingLink')} />
          </div>

          <div className="space-y-1.5">
            <Label>Interviewer</Label>
            <Input {...register('interviewer')} />
          </div>

          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea rows={3} {...register('notes')} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Планирование...' : 'Запланировать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}