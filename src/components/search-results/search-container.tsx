'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { LocateFixedIcon, Search } from 'lucide-react';
import JobFilters from './job-filters';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import JobTable from './job-table';

const SearchContainer = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchRole, setSearchRole] = useState<string>(searchQuery || '');
  const [searchLocation, setSearchLocation] = useState<string>(
    searchParams.get('location') || ''
  );
  const [jobTypeFilter, setJobTypeFilter] = useState<string>(
    searchParams.get('jobType') || ''
  );
  const [salaryFilter, setSalaryFilter] = useState<string>(
    searchParams.get('salary') || ''
  );
  const [companyFilter, setCompanyFilter] = useState<string>(
    searchParams.get('company') || ''
  );
  const [diversityFilter, setDiversityFilter] = useState<string>(
    searchParams.get('diversity') || ''
  );

  // const async handleSearch() {
  //   const params = new URLSearchParams();
  //   if (searchRole) params.set('search', searchRole);
  //   if (searchLocation) params.set('location', searchLocation);
  //   if (jobTypeFilter) params.set('jobType', jobTypeFilter);
  //   if (salaryFilter) params.set('salary', salaryFilter);
  //   if (companyFilter) params.set('company', companyFilter);
  //   if (diversityFilter) params.set('diversity', diversityFilter);

  //   const queryString = params.toString();
  //   window.location.href = `/dashboard/search-results?${queryString}`;
  // }

  return (
    <div className="h-screen flex flex-col px-4">
      {/* Search Inputs */}
      <div className="flex items-center justify-center gap-x-2 mb-6">
        <label className="relative">
          <Search className="absolute left-2 top-2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Job Role..."
            value={searchRole}
            onChange={(e) => setSearchRole(e.target.value)}
            className="rounded-md focus:outline-none pl-9"
          />
        </label>

        <label className="relative">
          <LocateFixedIcon className="absolute left-2 top-2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="City, state, or zip code..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="rounded-md focus:outline-none pl-9"
          />
        </label>

        <Button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Search
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center mb-8">
        <JobFilters
          jobTypeFilter={jobTypeFilter}
          setJobTypeFilter={setJobTypeFilter}
          salaryFilter={salaryFilter}
          setSalaryFilter={setSalaryFilter}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          diversityFilter={diversityFilter}
          setDiversityFilter={setDiversityFilter}
        />
      </div>

      {/* Job Card Table */}
      <div className=" flex flex-grow justify-center overflow-y-auto items-center ">
        <JobTable />
      </div>
    </div>
  );
};

export default SearchContainer;
