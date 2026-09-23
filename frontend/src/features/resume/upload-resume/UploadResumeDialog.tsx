import { useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useUploadResume } from "@/entities/resume/api/queries";

export function UploadResumeDialog() {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [label, setLabel] = useState('')
    const uploadResume = useUploadResume()

    const handleSubmit = async () => {
        if (!file) {
            toast.error('Выберите файл')
            return
        }
        try {
            await uploadResume.mutateAsync({ file, label: label || file.name })
            toast.success('Резюме загружено')
            setFile(null)
            setLabel('')
            setOpen(false)
        } catch {
            toast.error('Не удалось загрузить резюме')
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button />}>
                <Upload className="mr-2 h-4 w-4" />
                Загрузить резюме
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Загрузить резюме</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label>Файл (PDF)</Label>
                        <Input 
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <Label>Название версии</Label>
                        <Input 
                        placeholder="Frontend, Middle, Backend..."
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={uploadResume.isPending}>
                        {uploadResume.isPending ? 'Загрузка...' : 'Загрузить'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}