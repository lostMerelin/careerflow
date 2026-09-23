import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Link2, Send } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUserStore } from '@/entities/user/model/store'
import { useUpdateProfile } from '@/entities/user/api/queries'

const profileSchema = z.object({
  lastName: z.string().min(1, 'Обязательное поле'),
  firstName: z.string().min(1, 'Обязательное поле'),
  patronymic: z.string().optional(),
  phone: z.string().optional(),
  experience: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  telegramUrl: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export function ProfilePage() {
  const user = useUserStore((state) => state.user)
  const updateProfile = useUpdateProfile()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastName: user?.last_name ?? '',
      firstName: user?.first_name ?? '',
      patronymic: user?.patronymic ?? '',
      phone: user?.phone ?? '',
      experience: user?.experience ?? '',
      githubUrl: user?.github_url ?? '',
      linkedinUrl: user?.linkedin_url ?? '',
      telegramUrl: user?.telegram_url ?? '',
    },
  })

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile.mutateAsync({
        last_name: values.lastName,
        first_name: values.firstName,
        patronymic: values.patronymic || undefined,
        phone: values.phone || undefined,
        experience: values.experience || undefined,
        github_url: values.githubUrl || undefined,
        linkedin_url: values.linkedinUrl || undefined,
        telegram_url: values.telegramUrl || undefined,
      })
      toast.success('Профиль сохранён')
    } catch {
      toast.error('Не удалось сохранить профиль')
    }
  }

  if (!user) return null

  const initial = (user.full_name ?? user.email).charAt(0).toUpperCase()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Профиль</h1>
        <p className="mt-1 text-muted-foreground">Ваши личные данные и контакты.</p>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-xl">{initial}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{user.full_name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Фамилия</Label>
            <Input {...register('lastName')} />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Имя</Label>
            <Input {...register('firstName')} />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Отчество</Label>
            <Input {...register('patronymic')} />
          </div>
          <div className="space-y-1.5">
            <Label>Телефон</Label>
            <Input type="tel" {...register('phone')} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Опыт / о себе</Label>
          <Textarea rows={4} placeholder="Пару слов о вашем опыте..." {...register('experience')} />
        </div>

        <div className="space-y-3">
          <Label>Ссылки</Label>
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input placeholder="https://github.com/username" {...register('githubUrl')} />
          </div>
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input placeholder="https://linkedin.com/in/username" {...register('linkedinUrl')} />
          </div>
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input placeholder="https://t.me/username" {...register('telegramUrl')} />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
        </Button>
      </form>
    </div>
  )
}