import { UpdatePwForm } from '@/components/forgot-password/UpdatePwForm';
import { Suspense } from 'react';
import Loading from '../../../components/ui/loading';

export default async function Page({ searchParams }: { searchParams: { token?: string } }) {
  const { token } = await searchParams;
  return (
    <Suspense fallback={<Loading message={'Loading'} />}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <UpdatePwForm token={token ?? ''} />
        </div>
      </div>
    </Suspense>
  );
}
