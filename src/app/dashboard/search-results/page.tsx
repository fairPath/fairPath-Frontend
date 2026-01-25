import SearchResultsContainer from '@/components/search-results/search-results-container';
import { Suspense } from 'react';

export default function SearchResultsPage() {
  return (
    <Suspense>
      <SearchResultsContainer />
    </Suspense>
  );
}
