'use client';
import SearchContainer from '@/components/search-results/search-container';
import { useSearchParams } from 'next/navigation';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  return <SearchContainer roleProp={searchQuery}></SearchContainer>;
}
