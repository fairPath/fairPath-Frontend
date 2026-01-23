'use client';

import { LoadingProvider } from './../components/shared/LoadingContext';
import GlobalSpinner   from './../components/ui/spinner';
//import '@radix-ui/themes/styles.css';


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <GlobalSpinner />
      {children}
    </LoadingProvider>
  );
}
