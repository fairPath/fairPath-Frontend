'use client';

import { useLoading } from '@/components/shared/LoadingContext';

export default function GlobalSpinner() {
  const { activeRequests } = useLoading();

  if (activeRequests == 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div className="h-full w-full animate-progress bg-blue-500" />
    </div>
  );
}
