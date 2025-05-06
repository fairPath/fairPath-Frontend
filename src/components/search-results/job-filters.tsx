import FilterButton from "./filter-button"


const JobFilters = () => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
  {/* Job Type Filter */}
  
  <FilterButton
  title="Job Type"
    options={['Full-Time', 'Part-Time', 'Contract', 'Internship']}
    onSelect={(value) => console.log(value)}
    placeholder="Select job type..."
    />

    <FilterButton
    title = "Experience Level"
    options={['Entry', 'Mid', 'Senior', 'Lead']}
    onSelect={(value) => console.log(value)}
    placeholder="Select experience level..."
    />

    <FilterButton
    title = "Salary Range"
    options={['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+']}
    onSelect={(value) => console.log(value)}
    placeholder="Select salary range..."
    />

    <FilterButton
    title = "Company"
    options={['Google', 'Microsoft', 'Amazon', 'Facebook']}
    onSelect={(value) => console.log(value)}
    placeholder="Select company..."
    />

    <FilterButton
    title = "Remote"
    options={['Remote', 'On-Site', 'Hybrid']}
    onSelect={(value) => console.log(value)}
    placeholder="Select remote option..."
    />

    <FilterButton
    title = "Diversity Score"
    options={['1', '2', '3', '4', '5']}
    onSelect={(value) => console.log(value)}
    placeholder="Select minimum diversity score..."
    />

</div>

  )
}

export default JobFilters