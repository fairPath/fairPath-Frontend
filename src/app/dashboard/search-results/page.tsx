'use client';
import SearchContainer from '@/components/search-results/search-container';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <Suspense>
      <SearchContainer roleProp={searchQuery}></SearchContainer>
    </Suspense>
  );
}
