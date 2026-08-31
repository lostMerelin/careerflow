import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { useCreateCompany } from '@/entities/company/api/queries'

const companySchema = z.object({
  name: z.string().min(1, 'Название компании обязательно'),
  website: z.string().optional(),
  description: z.string().optional(),
  hrContactName: z.string().optional(),
  hrContactEmail: z.string().optional(),
  notes: z.string().optional(),
})

type CompanyFormValues = z.infer<typeof companySchema>

export function CreateCompanyDialog() {
    const [open, setOpen] = useState(false)
    const createCompany = useCreateCompany()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting}, 
    } = useForm<CompanyFormValues>({resolver: zodResolver(companySchema) })

    const onSubmit = async(values: CompanyFormValues) => {
        try{
            await createCompany.mutateAsync({
                name: values.name,
                website: values.website || undefined,
                description: values.description || undefined,
                hr_contact_name: values.hrContactName || undefined,
                hr_contact_email: values.hrContactEmail || undefined,
                notes: values.notes || undefined,
            })
            toast.success('Компания добавлена')
            reset()
            setOpen(false)
        }   catch {
            toast.error('Невозможно добавить компанию')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}>
                <Plus className='mr-2 h-4 w-4' />
                Новая компания
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Добавить компанию</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='space-y-1.5'>
                        <Label>Название компании</Label>
                        <Input {...register('name')} />
                        {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
                    </div>
                    <div className='space-y-1.5'>
                        <Label>Сайт</Label>
                        <Input placeholder="https://..." {...register('website')} />
                    </div>
                    <div className='space-y-1.5'>
                        <Label>Описание</Label>
                        <Textarea rows={2} {...register('description')} />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-1.5'>
                            <Label>Имя HR</Label>
                            <Input {...register('hrContactName')} />
                        </div>
                        <div className='space-y-1.5'>
                            <Label>Почта HR</Label>
                            <Input type="email" {...register('hrContactEmail')} />
                        </div>
                    </div>
                    <div className='space-y-1.5'>
                        <Label>Заметки</Label>
                        <Textarea rows={3} {...register('notes')}/>
                    </div>
                    <DialogFooter>
                        <Button type='submit' disabled={isSubmitting}>
                            {isSubmitting ? 'Ожидание...' : 'Добавить компанию'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}