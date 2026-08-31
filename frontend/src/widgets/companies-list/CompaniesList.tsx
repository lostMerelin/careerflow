import { Building2, Globe, Mail, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Company } from '@/entities/company/model/types'
import { useDeleteCompany } from '@/entities/company/api/queries'

interface CompaniesListProps {
  companies: Company[]
}

export function CompaniesList({ companies }: CompaniesListProps) {
  const deleteCompany = useDeleteCompany()

  if (companies.length === 0) {
    return (
      <div className="rounded-lg border p-12 text-center text-muted-foreground">
        No companies yet. Add your first one!
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <div key={company.id} className="space-y-3 rounded-lg border bg-background p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium leading-tight">{company.name}</p>
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    <Globe className="h-3 w-3" />
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteCompany.mutate(company.id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          {company.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">{company.description}</p>
          )}

          {company.hr_contact_email && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              {company.hr_contact_name ? `${company.hr_contact_name} · ` : ''}
              {company.hr_contact_email}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}