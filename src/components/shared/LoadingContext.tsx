'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type LoadingContextType = {
  activeRequests: number;
  startLoading: () => void;
  stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [activeRequests, setActiveRequests] = useState(0);

  const startLoading = () => {
    setActiveRequests((n) => n + 1);
  };

  const stopLoading = () => {
    setActiveRequests((n) => Math.max(0, n - 1));
  };

  return (
    <LoadingContext.Provider
      value={{ activeRequests, startLoading, stopLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return ctx;
}
