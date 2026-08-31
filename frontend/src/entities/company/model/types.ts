export interface Company {
  id: string
  name: string
  website: string | null
  description: string | null
  hr_contact_name: string | null
  hr_contact_email: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface CompanyInput {
  name: string
  website?: string | null
  description?: string | null
  hr_contact_name?: string | null
  hr_contact_email?: string | null
  notes?: string | null
}