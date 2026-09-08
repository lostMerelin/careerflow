import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { Interview } from '@/entities/interview/model/types'
import { resultLabels } from '@/entities/interview/config/labels'

interface InterviewResultsChartProps {
    interviews: Interview[]
}

const COLORS: Record<string, string> = {
    pending: '#94a3b8',
    passed: '#10b981',
    failed: 'ef4444',
}

export function InterviewResultChart({interviews} : InterviewResultsChartProps) {
    const data = (['pending', 'passed', 'failed'] as const).map((result) => ({
        name: resultLabels[result].label,
        value: interviews.filter((interview) => interview.result === result).length,
        key: result,
    }))

    const hasData = data.some((item) => item.value > 0)

    return (
        <div className='rounded-lg border bg-background p-4'>
            <h3 className='mb-4 text-sm font-medium'>Результаты собеседований</h3>
            {hasData ? (
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                            {data.map((entry) => (
                                <Cell key={entry.key} fill={COLORS[entry.key]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p className='flex h-[280px] items-center justify-center text-sm text-muted-foreground'>
                    Пока нет данных.
                </p>
            )}
        </div>
    )
}