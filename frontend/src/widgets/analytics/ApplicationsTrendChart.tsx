import { useMemo } from "react";
import { format, startOfMonth, subMonths } from "date-fns";
import { ru } from "date-fns/locale";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Job } from "@/entities/job/model/types";

interface ApplicationTrendChartProps {
    jobs: Job[]
}

export function ApplicaitonsTrendChart({ jobs }: ApplicationTrendChartProps) {
    const data = useMemo(() => {
        const months = Array.from({ length: 6 }).map((_, i) => startOfMonth(subMonths(new Date(), 5 - i)))

        return months.map((monthStart) => {
            const count = jobs.filter((job) => {
                const created = new Date(job.created_at)
                return (
                    created.getFullYear() === monthStart.getFullYear() && created.getMonth() === monthStart.getMonth()
                )
            }).length

            return {
                month: format(monthStart, 'LLL', {locale: ru}),
                count,
            }
        })
    }, [jobs]) 

    return (
        <div className="rounded-lg border bg-background p-4">
            <h3 className="mb-4 text-sm font-medium">Отклики по месяцам</h3>
            <ResponsiveContainer width='100%' height={280}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}