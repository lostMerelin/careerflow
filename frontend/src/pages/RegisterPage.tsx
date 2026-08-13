import {Link} from 'react-router-dom'
import { RegisterForm } from '@/features/auth/register/RegisterForm'

export function RegisterPage(){
    return(
        <div className='flex min-h-screen items-center justify-center bg-muted/30 px-4'>
            <div className='w-full max-w-sm space-y-6 rounded-xl border bg-background p-8 shadow-sm'>
            <div className='space-y-1 text-center'>
                <h1 className='text-xl font-semibold tracking-tight'>Создайте свою учетную запись</h1>
                <p className='text-sm text-muted-foreground'>Начните отслеживать свой поиск работы</p>
            </div>
            <RegisterForm />
            <p className='text-center text-sm text-muted-foreground'>
                У вас уже есть учетная запись?{' '} 
                <Link to ="/login" className='font-medium text-primary underline-offset-4 hover:underline'>
                Войти
                </Link>
            </p>
        </div>
        </div>
    )
}