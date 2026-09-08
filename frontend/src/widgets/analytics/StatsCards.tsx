import { Briefcase, CalendarClock, Percent, Trophy } from 'lucide-react'
import type { Job } from '@/entities/job/model/types'
import type { Interview } from '@/entities/interview/model/types'

interface StatsCardsProps {
    jobs: Job[]
    interviews: Interview[] 
}

const respondedStatuses = [
    'hr_contacted',
    'interview',
    'technical_interview',
    'test_task',
    'offer',
    'rejected',
    'accepted',
]

export function StatsCards ({jobs, interviews}: StatsCardsProps) {
    const totalApplications = jobs.filter((job) => job.status !== 'wishlist').length
    const offerCount = jobs.filter((job) => job.status === 'offer' || job.status === 'accepted').length
    const respondedCount = jobs.filter((job) => respondedStatuses.includes(job.status)).length
    const responseRate = totalApplications > 0 ? Math.round((respondedCount / totalApplications) * 100) : 0

    const cards = [
        { label: 'Всего откликов', value: totalApplications, icon: Briefcase, color: 'text-blue-600 bg-blue-100'},
        { label: 'Собеседований', value: interviews.length, icon: CalendarClock, color: 'text-purple-600 bg-purple-100'},
        { label: 'Офферов', value: offerCount, icon: Trophy, color: 'text-emerald-600 bg-emerald-100'},
        { label: 'Частота ответов', value: `${responseRate}%`, icon: Percent, color: 'text-amber=600 bg-amber-100'},

    ]

    return(
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {cards.map((card) => (
                <div key={card.label} className='rounded-lg border bg-background p-4'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm text-muted-foreground'>{card.label}</p>
                        <div className={`flex h-8 w-8 items-center justify-center rounded-md ${card.color}`}>
                            <card.icon className='h-4 w-4'/>
                    </div>
                </div>
                <p className='mt-2 text-2xl font-semibold'>{card.value}</p>
                </div>
            ))}
        </div>
    )
}