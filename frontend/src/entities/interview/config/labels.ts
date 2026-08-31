import type { InterviewResult, InterviewStage } from "@/entities/company/model/types";

export const stageLabels: Record<InterviewStage, string> = {
    hr: 'HR',
    technical: 'Technical',
    final: 'Final',
}

export const resultLabels: Record<InterviewResult, { label: string; className: string}> = {
    pending: { label: 'Pending', className: 'bg-slate-100 text-slate-700'},
    passed: {label: 'Passed', className: 'bd-emerland-100 text-emerland-700'},
    failed: {label: 'Failed', className: 'bg-red-100 text-red-700'}
}