import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function RouteError() {
    const error = useRouteError()
    const navigate = useNavigate()

    const message = isRouteErrorResponse(error) ? error.status === 404 ? 'Такой страницы не существует.' : `Ошибка ${error.status}.` : 'Что-то пошло не так. Попробуйте обносить страницу.'

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Упс!</h1>
            <p className="text-muted-foreground">{message}</p>
            <div className="flex gap-2">
                <Button variant='outline' onClick={() => window.location.reload()}>
                    Обновить страницу
                </Button>
                <Button onClick={() => navigate('/dashboard')}>На главную</Button>
            </div>
        </div>
    )
}