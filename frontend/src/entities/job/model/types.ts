export type JobStatus =
  | 'wishlist'
  | 'applied'
  | 'hr_contacted'
  | 'interview'
  | 'technical_interview'
  | 'test_task'
  | 'offer'
  | 'rejected'
  | 'accepted'

export type JobPriority = 'low' | 'medium' | 'high'

export interface Job {
  id: string
  company: string
  position: string
  salary: string | null
  location: string | null
  remote: boolean
  link: string | null
  applied_date: string | null
  status: JobStatus
  priority: JobPriority
  tags: string[]
  notes: string | null
  created_at: string
  updated_at: string
}

export interface JobInput {
  company: string
  position: string
  salary?: string | null
  location?: string | null
  remote?: boolean
  link?: string | null
  applied_date?: string | null
  status?: JobStatus
  priority?: JobPriority
  tags?: string[]
  notes?: string | null
}