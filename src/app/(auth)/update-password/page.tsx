import { UpdatePwForm } from '@/components/forgot-password/UpdatePwForm';

export default async function Page({ searchParams }: { searchParams: { token?: string } }) {
  const { token } = await searchParams;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePwForm token={token ?? ''} />
      </div>
    </div>
  );
}
