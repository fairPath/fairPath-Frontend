import SavedJobs from '@/components/saved-jobs/saved-jobs';
import { Suspense } from 'react';
import { Job } from '@/types/Job';
import { serverApiFetch } from '@/lib/server-api-client';

const getSavedJobs = async (): Promise<Job[]> => {
  return serverApiFetch<Job[]>('/saved-jobs/list', {
    method: 'GET',
    cache: 'no-store',
  });
};

export default async function SearchResultsPage() {
  const jobs = await getSavedJobs();
  return (
    <Suspense>
      <SavedJobs jobs={jobs} />
    </Suspense>
  );
}
