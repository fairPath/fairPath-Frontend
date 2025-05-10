'use client';

import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { LocateFixedIcon, Search } from 'lucide-react';
import JobFilters from './job-filters';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import JobTable from './job-table';
import { Job } from '@/types/Job';
//import Loader from '../ui/loader';
import axios from 'axios';

const SearchContainer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]); // Replace 'any' with your job type
  const [searchRole, setSearchRole] = useState<string>(
    searchParams.get('titleOnly') || ''
  );
  const [searchLocation, setSearchLocation] = useState<string>(
    searchParams.get('where') || ''
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

  useEffect(() => {
    const fetchData = async () => {
      const title = searchParams.get('titleOnly');
      const location = searchParams.get('where');
      const jobType = searchParams.get('jobType');
      const salary = searchParams.get('salary');
      const company = searchParams.get('company');
      const diversity = searchParams.get('diversity');

      if (title) setSearchRole(title);
      if (location) setSearchLocation(location);
      if (jobType) setJobTypeFilter(jobType);
      if (salary) setSalaryFilter(salary);
      if (company) setCompanyFilter(company);
      if (diversity) setDiversityFilter(diversity);

      // Call API and return mock data
      try {
        setLoading(true);
       await axios
          .get<Job[]>(`http://localhost:8080/jobs?titleOnly=${title}`)
          .then((res) => {
            setJobs(res.data);
            console.log('res', res.data);
          })
          .catch((err) => {
            console.error(err);
          });

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(`An error occurred while fetching jobs ${error}`);
      }
    };

    fetchData();
  }, []);

  const searchJobs = async () => {
    const params = new URLSearchParams();
    const backendRequestParams = new URLSearchParams();
    if (searchRole){ 
      params.append('titleOnly', searchRole);
      backendRequestParams.append('titleOnly', searchRole);
    }
    if (searchLocation) {
      params.append('where', searchLocation);
      backendRequestParams.append('where', searchLocation);
    }
    if (jobTypeFilter) {
      params.append('jobType', jobTypeFilter);
      const jobTypeConversion: Record<string, string> = {'Full-Time':'fullTime', 'Part-Time':'partTime', 'Contract':'contract'}
      backendRequestParams.append(jobTypeConversion[jobTypeFilter], '1');
    }
    if (salaryFilter) {
      params.append('salary', salaryFilter);
      const salaryMinConversion: Record<string, string>={'$40k+':'40000',
          '$60k+':'60000',
          '$80k+':'80000',
          '$100k+':'100000',
          '$120k+':'120000',
          '$140k+':'140000',
          '$160k+':'160000',
          '$180k+':'180000'};
      backendRequestParams.append('salaryMin', salaryMinConversion[salaryFilter]);
    }
    if (companyFilter) {
      params.append('company', companyFilter);
      backendRequestParams.append('company', companyFilter)
    }
    if (diversityFilter) {
      params.append('diversity', diversityFilter);
      backendRequestParams.append('rating', diversityFilter);
    }
    const queryString = params.toString();
    const url = `/dashboard/search-results?${queryString}`;
    router.push(url);
console.log(backendRequestParams.toString(),{salaryFilter});
    try {
      setLoading(true);
      await axios
        .get<Job[]>(`http://localhost:8080/jobs?${backendRequestParams}`)
        .then((res) => {
          setJobs(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
      router.push(
        `/dashboard/search-results?title=${searchRole}&location=${searchLocation}&jobType=${jobTypeFilter}&salary=${salaryFilter}&company=${companyFilter}&diversity=${diversityFilter}`
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An error occurred while fetching jobs ${error}`);
    }
  };
  return (
    <>
      {loading && (
        <div className="flex items-center justify-center w-full h-full">
          {/* <Loader /> */}
        </div>
      )}
      {!loading && error && <div>error loading jobs: {error}</div>}
      {!loading && !error && jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold">No jobs found</h2>
          <p className="text-gray-500">Try a different search.</p>
          <Button
            onClick={() => router.push('/dashboard')}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Back to Dashboard
          </Button>
        </div>
      )}
      {!loading && !error && jobs.length > 0 && (
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

            <Button
              onClick={() => searchJobs()}
              className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center mb-8 pr-3">
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
            <JobTable
              jobs={jobs}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SearchContainer;