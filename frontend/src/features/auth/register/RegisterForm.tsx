import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/shared/api/axios'
import { tokenStorage } from '@/shared/lib/token'
import { useUserStore } from '@/entities/user/model/store'
import { loginRequest, registerRequest } from '../api/authApi'

const registerSchema = z
  .object({
    lastName: z.string().min(1, 'Required'),
    firstName: z.string().min(1, 'Required'),
    patronymic: z.string().optional(),
    email: z.string().email('Enter a valid email'),
    phone: z.string().optional(),
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
  const navigate = useNavigate()
  const setUser = useUserStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerRequest({
        email: values.email,
        password: values.password,
        last_name: values.lastName,
        first_name: values.firstName,
        patronymic: values.patronymic || undefined,
        phone: values.phone || undefined,
      })
      const { access_token } = await loginRequest({
        email: values.email,
        password: values.password,
      })
      tokenStorage.set(access_token)
      const { data: user } = await api.get('/api/v1/auth/me')
      setUser(user)
      toast.success('Аккаунт создан!')
      navigate('/dashboard')
    } catch {
      toast.error('Не удалось создать учетную запись')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Фамилия</Label>
          <Input placeholder="Иванов" {...register('lastName')} />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Имя</Label>
          <Input placeholder="Иван" {...register('firstName')} />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Отчество (необязательно)</Label>
        <Input placeholder="Иванович" {...register('patronymic')} />
      </div>

      <div className="space-y-1.5">
        <Label>Почта</Label>
        <Input type="email" placeholder="you@example.com" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Телефон</Label>
        <Input type="tel" placeholder="+7 999 111 11 11" {...register('phone')} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Пароль</Label>
          <Input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label>Подтверждение пароля</Label>
          <Input type="password" placeholder="••••••••" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Создание аккаунта...' : 'Создать учетную запись'}
      </Button>
    </form>
  )
}