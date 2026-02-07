'use server';
import SavedJobs from '@/components/saved-jobs/saved-jobs';
import { Suspense } from 'react';
import { Job } from '@/types/Job';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getToken = async () => {
  return (await cookies()).get('authToken')?.value;
};
const getSavedJobs = async (token: string): Promise<Job[] | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/saved-jobs/list`,
      {
        headers: {
          Cookie: `authToken=${token}`,
        },
      }
    );
    if (response.data) return response.data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'delete user failed';
    console.error(message);
  }
};

export default async function SearchResultsPage() {
  const token = await getToken();
  if (!token) redirect('/login');
  const jobs = await getSavedJobs(token);
  return (
    <Suspense>
      <SavedJobs jobs={jobs} token={token} />
    </Suspense>
  );
}
