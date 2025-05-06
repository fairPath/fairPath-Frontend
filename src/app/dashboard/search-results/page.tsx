'use client';
import SearchContainer from '@/components/search-results/search-container';
import { Suspense } from 'react';

export default function SearchResultsPage() {
  return (
    <Suspense>
      <SearchContainer />
    </Suspense>
  );
}
