export type JobSearchFilters = {
  titleOnly: string;
  where: string;
  jobType: string;
  salary: string;
  company: string;
  diversity: string;
};

type SearchParamValue = string | string[] | undefined;

const jobTypeConversion: Record<string, string> = {
  'Full-Time': 'fullTime',
  'Part-Time': 'partTime',
  Contract: 'contract',
};

const salaryMinConversion: Record<string, string> = {
  '$40k+': '40000',
  '$60k+': '60000',
  '$80k+': '80000',
  '$100k+': '100000',
  '$120k+': '120000',
  '$140k+': '140000',
  '$160k+': '160000',
  '$180k+': '180000',
};

const getSearchParamValue = (value: SearchParamValue): string => {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }

  return value ?? '';
};

export const getJobSearchFilters = (
  searchParams: Record<string, SearchParamValue>
): JobSearchFilters => ({
  titleOnly: getSearchParamValue(searchParams.titleOnly),
  where: getSearchParamValue(searchParams.where),
  jobType: getSearchParamValue(searchParams.jobType),
  salary: getSearchParamValue(searchParams.salary),
  company: getSearchParamValue(searchParams.company),
  diversity: getSearchParamValue(searchParams.diversity),
});

export const buildSearchResultsParams = (filters: JobSearchFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.titleOnly) {
    params.set('titleOnly', filters.titleOnly);
  }
  if (filters.where) {
    params.set('where', filters.where);
  }
  if (filters.jobType) {
    params.set('jobType', filters.jobType);
  }
  if (filters.salary) {
    params.set('salary', filters.salary);
  }
  if (filters.company) {
    params.set('company', filters.company);
  }
  if (filters.diversity) {
    params.set('diversity', filters.diversity);
  }

  return params;
};

export const buildJobsBackendParams = (filters: JobSearchFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.titleOnly) {
    params.set('titleOnly', filters.titleOnly);
  }
  if (filters.where) {
    params.set('where', filters.where);
  }

  const jobTypeParam = jobTypeConversion[filters.jobType];
  if (jobTypeParam) {
    params.set(jobTypeParam, '1');
  }

  const salaryMin = salaryMinConversion[filters.salary];
  if (salaryMin) {
    params.set('salaryMin', salaryMin);
  }
  if (filters.company) {
    params.set('company', filters.company);
  }
  if (filters.diversity) {
    params.set('rating', filters.diversity);
  }

  return params;
};
