import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/shared/api/axios'
import { tokenStorage } from '@/shared/lib/token'
import { useUserStore } from '@/entities/user/model/store'
import { loginRequest, registerRequest } from '../api/authApi'

const registerSchema = z.object({
    fullName: z.string().min(1, 'Требуется указать имя'),
    email: z.string().email('Введите почту'),
    password: z.string().min(8, 'Не менее 8 символов')
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({resolver: zodResolver(registerSchema)})

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            await registerRequest({
                email: values.email,
                password: values.password,
                full_name: values.fullName,
            })
            const {access_token} = await loginRequest(values)
            tokenStorage.set(access_token)
            const{data:user} = await api.get('/api/v1/auth/me')
            setUser(user)
            toast.success('Учетная запись создана!')
            navigate ('/dashbord')
        } catch {
            toast.error('Не удалось создать учетную запись')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='space-y-1.5'>
                <label className='text-sm font-medium'>ФИО</label>
                <Input placeholder='Roman' {...register('fullName')}/>
                {errors.fullName && <p className='text-sm text-destructive'>{errors.fullName.message}</p>}
            </div>
            <div className='space-y-1.5'>
                <label className='text-sm font-medium'>Пароль</label>
                <Input type='password' placeholder="••••••••"  {...register('password')}/>
                {errors.password && <p className='text-sm text-destructive'>{errors.password.message}</p>}
            </div>
            <Button>
                {isSubmitting ? 'Создаем аккаунт...' : 'Аккаунт создан'}
            </Button>
        </form>
    )
}