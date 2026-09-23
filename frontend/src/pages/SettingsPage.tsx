import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Download, Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { applyTheme, getStoredTheme, setStoredTheme, type Theme } from "@/shared/lib/theme";
import { tokenStorage } from "@/shared/lib/token";
import { useUserStore } from "@/entities/user/model/store";
import { exportUserData, deleteAccount } from "@/entities/user/api/userApi";

const themeOptions: {value: Theme; label: string; icon: typeof Sun }[] = [
  {value: 'light', label: 'Светлая', icon: Sun},
  {value: 'dark', label: 'Темная', icon: Moon},
  {value: 'system', label: 'Системная', icon: Laptop},
]

export function SettingsPage() {
  const navigate = useNavigate()
  const clearUser = useUserStore((state) => state.clearUser)
  const [theme, setTheme] = useState<Theme>(getStoredTheme())
  const [isExporting, setIsExporting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleThemeChange = (value: Theme) => {
    setTheme(value)
    setStoredTheme(value)
    applyTheme(value)
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const data = await exportUserData()
      const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'})
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'careerflow-data.json'
      link.click()
      URL.revokeObjectURL(url)
      toast.success('Данные выгружены')
    } catch {
      toast.error('Не удалось выгрузить данные')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteAccount()
      tokenStorage.clear()
      clearUser()
      toast.success('Аккаунт удален')
      navigate('/login')
    } catch {
      toast.error('Не удалось удалить аккаунт')
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Настройки</h1>
        <p className="mt-1 text-muted-foreground">Управление акканутом и внешним видом.</p>
      </div>

      <section className="space-y-3 rounded-lg border p-4">
        <h2 className="text-sm font-medium">Тема оформления</h2>
        <div className="flex gap-2">
          {themeOptions.map((option) => (
            <Button
            key={option.value}
            variant={theme === option.value ? 'default' : 'outline'}
            size='sm'
            onClick={() => handleThemeChange(option.value)}
            >
              <option.icon className="mr-2 h-4 w-4" />
              {option.label}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-lg border p-4">
        <h2 className="text-sm font-medium">Экспорт данных</h2>
        <p className="text-sm text-muted-foreground">
          Скачайте все свои данные (вакансии, компании, собеседования, задачи, заметки) в формате JSON.
        </p>
        <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Подготовка...' : 'Скачать данные'}
        </Button>
      </section>

      <section className="space-y-3 rounded-lg border border-destructive/50 p-4">
          <h2 className="text-sm font-medium text-destructive">Осторожно</h2>
          <p className="text-sm text-muted-foreground">
            Удаление аккаунта необратимо. Все ваши данные будут удалены без возможности восстановления.
          </p>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
            Удалить аккаунт
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Аккаунт и все связанные с ним данные будут удалены навсегда.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? 'Удаление...' : 'Да, удалить'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      </section>
    </div>
  )
}