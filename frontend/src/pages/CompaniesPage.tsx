import { CreateCompanyDialog } from '@/features/companies/create-company/CreateCompanyDialog'
import { CompaniesList } from '@/widgets/companies-list/CompaniesList'
import { useCompanies } from '@/entities/company/api/queries'

export function CompaniesPage() {
  const { data: companies, isLoading } = useCompanies()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Companies</h1>
          <p className="mt-1 text-muted-foreground">Keep track of companies you're interested in.</p>
        </div>
        <CreateCompanyDialog />
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <CompaniesList companies={companies ?? []} />
      )}
    </div>
  )
}