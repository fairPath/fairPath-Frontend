import { isRedirectError } from 'next/dist/client/components/redirect-error';

import SearchResultsContainer from '@/components/search-results/search-results-container';
import { buildJobsBackendParams, getJobSearchFilters } from '@/lib/job-search';
import { serverApiFetch } from '@/lib/server-api-client';
import { Job } from '@/types/Job';

type SearchResultsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getJobs = async (params: URLSearchParams): Promise<Job[]> => {
  const query = params.toString();
  const path = query ? `/jobs?${query}` : '/jobs';

  return serverApiFetch<Job[]>(path, {
    method: 'GET',
    cache: 'no-store',
  });
};

export default async function SearchResultsPage({ searchParams }: SearchResultsPageProps) {
  const filters = getJobSearchFilters(await searchParams);
  let jobs: Job[] = [];
  let initialError: string | null = null;

  try {
    jobs = await getJobs(buildJobsBackendParams(filters));
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    initialError = error instanceof Error ? error.message : 'Failed to load jobs';
  }

  return (
    <SearchResultsContainer
      initialJobs={jobs}
      initialFilters={filters}
      initialError={initialError}
    />
  );
}
