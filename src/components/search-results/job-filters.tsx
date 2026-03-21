import FilterButton from './filter-button';

interface JobFiltersProps {
  jobTypeFilter: string;
  setJobTypeFilter: (value: string) => void;
  salaryFilter: string;
  setSalaryFilter: (value: string) => void;
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
}

const JobFilters = ({
  jobTypeFilter,
  setJobTypeFilter,
  salaryFilter,
  setSalaryFilter,
  companyFilter,
  setCompanyFilter,
}: JobFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <FilterButton
        title="Job Type"
        options={['Full-Time', 'Part-Time', 'Contract']}
        value={jobTypeFilter}
        onSelect={(value) => setJobTypeFilter(value)}
        placeholder="Select job type..."
      />

      <FilterButton
        title="Salary"
        options={['$40k+', '$60k+', '$80k+', '$100k+', '$120k+', '$140k+', '$160k+', '$180k+']}
        value={salaryFilter}
        onSelect={(value) => setSalaryFilter(value)}
        placeholder="Select salary range..."
      />

      <FilterButton
        title="Company"
        options={['Google', 'Microsoft', 'Amazon', 'Facebook']}
        onSelect={(value) => setCompanyFilter(value)}
        value={companyFilter}
        placeholder="Select company..."
      />
    </div>
  );
};

export default JobFilters;
