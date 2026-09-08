import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import type { Job } from '@/entities/job/model/types'
import { statusConfig, statusOrder } from '@/entities/job/config/statusConfig'

interface StatusFunnelChartProps {
    jobs: Job[]
}

export function StatusFunnelChart({jobs}: StatusFunnelChartProps) {
    const data = statusOrder.map((status) => ({
        status: statusConfig[status].label,
        count: jobs.filter((job) => job.status === status).length,
    }))

    return(
        <div className='rounded-lg border bg-background p-4'>
            <h3 className='mb-4 text-sm font-medium'>Вакансии по статусам</h3>
            <ResponsiveContainer width='100%' height={280}>
                <BarChart data={data} layout='vertical' margin={{ left: 24 }}>
                    <CartesianGrid strokeDasharray='3 3' horizontal={false} />
                    <XAxis type='number' allowDecimals={false} />
                    <YAxis type='category' dataKey='status' width={160} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill='#4F46E5' radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}