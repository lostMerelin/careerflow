import type { InterviewResult, InterviewStage } from "@/entities/company/model/types";

export const stageLabels: Record<InterviewStage, string> = {
    hr: 'HR',
    technical: 'Техническое',
    final: 'Финальное',
}

export const resultLabels: Record<InterviewResult, { label: string; className: string}> = {
    pending: { label: 'Ожидание', className: 'bg-slate-100 text-slate-700'},
    passed: {label: 'Пройдено', className: 'bd-emerland-100 text-emerland-700'},
    failed: {label: 'Не пройдено', className: 'bg-red-100 text-red-700'}
}