export type InterviewType = 'online' | 'offline'
export type InterviewStage = 'hr' | 'technical' | 'final'
export type InterviewResult = 'pending' | 'passed' | 'failed'

export interface Interview {
  id: string
  company: string
  position: string | null
  scheduled_at: string
  type: InterviewType
  meeting_link: string | null
  stage: InterviewStage
  interviewer: string | null
  notes: string | null
  result: InterviewResult
  created_at: string
  updated_at: string
}

export interface InterviewInput {
  company: string
  position?: string | null
  scheduled_at: string
  type?: InterviewType
  meeting_link?: string | null
  stage?: InterviewStage
  interviewer?: string | null
  notes?: string | null
  result?: InterviewResult
}