import Loading from '../../../components/ui/loading';
import VerifyForm from '@/components/verify/VerifyForm';
import { Suspense } from 'react';

export default async function VerifyPage({ searchParams }: { searchParams: { email?: string } }) {
  const { email } = await searchParams;
  return (
    <Suspense fallback={<Loading message={'Loading...'} />}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <VerifyForm email={email ?? ''} />
        </div>
      </div>
    </Suspense>
  );
}
