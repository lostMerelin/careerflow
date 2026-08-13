import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth/login/LoginForm'

export function LoginPage() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-muted/30 px-4'>
            <div className='w-full max-w-sm space-y-6 rounded-xl border bg-background p-8 shadow-sm'>
                <div className='space-y-1 text-center'>
                    <h1 className='text-xl font-semibold tracking-tight'>С возвращением</h1>
                    <p className='text-sm text-muted-foreground'>Вход</p>
                </div>
                <LoginForm />
                <p className='text-center text-sm text-muted-foreground'>
                    У вас нет учетной записи?{' '}
                    <Link to="/register" className='font-medium text-primary underline-offset-4 hover:underline'>
                    Зарегистрироваться
                    </Link>
                </p>
            </div>
        </div>
    )
}