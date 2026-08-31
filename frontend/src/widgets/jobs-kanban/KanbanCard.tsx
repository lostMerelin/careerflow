import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/entities/job/model/types";


interface KanbanCardProps{
    job : Job
}

export function KanbanCard({job} : KanbanCardProps) {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: job.id,
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
    }

    return (
        <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="cursor-grab space-y-2 rounded-lg border bg-background p-3 shadow-sm active:cursor-grabbing"
        >
            <p className="text-sm font-medium leading-tight">{job.position}</p>
            <p className="text-xs text-muted-foreground">{job.company}</p>
            <div className="flex items-center justify-between">
                {job.salary && <span className="text-xs text-muted-foreground">{job.salary}</span>}
                {job.priority === 'high' && (
                    <Badge variant="secondary" className="bg-red-100 text-[10px] text-red-700">
                        Высокий
                    </Badge>
                )}
            </div>
        </div>
    )
}