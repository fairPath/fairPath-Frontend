import SearchResultsContainer from '@/components/search-results/search-results-container';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Loading from './../../../components/ui/loading';

const getToken = async () => {
  return (await cookies()).get('authToken')?.value;
};

export default async function SearchResultsPage() {
  const token = await getToken();
  if (!token) {
    redirect('/login'); // ✅ server redirect
  }
  return (
    <Suspense fallback={<Loading message={'Loading...'} />}>
      <SearchResultsContainer token={token} />
    </Suspense>
  );
}
