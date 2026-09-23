import { Download, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeFile } from "@/entities/resume/model/types";
import { useDeleteResume } from "@/entities/resume/api/queries";
import { downloadResume } from "@/entities/resume/api/resumeApi";

interface ResumeListProps {
    resumes: ResumeFile[]
}

function formatSize(bytes: number): string {
    if(bytes < 1024) return `${bytes} Б`
    if(bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`
} 

export function ResumeList({ resumes }: ResumeListProps) {
    const deleteResume = useDeleteResume()

    if(resumes.length === 0) {
        return (
            <div className="rounded-lg border p-12 text-center text-muted-foreground">
                Пока нет загруженных резюме.
            </div>
        )
    }

    return (
        <div className="space-y-2">
            {resumes.map((resume) => (
                <div
                key={resume.id}
                className="flex items-center justify-between rounded-lg border bg-background p-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                            <FileText className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{resume.label}</p>
                            <p className="text-xs text-muted-foreground">
                                {formatSize(resume.size_bytes)} · {new Date(resume.created_at).toLocaleDateString('ru-RU')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => downloadResume(resume.id, resume.original_filename)}
                        >
                            <Download className="h-4 w-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteResume.mutate(resume.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}