import { ForgotPwForm } from '@/components/forgot-password/ForgotPwForm';
import { Suspense } from 'react';
import Loading from '../../../components/ui/loading';

export default function Page() {
  return (
    <Suspense fallback={<Loading message={'Loading...'} />}>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <ForgotPwForm />
        </div>
      </div>
    </Suspense>
  );
}
