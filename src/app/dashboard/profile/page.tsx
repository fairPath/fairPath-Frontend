import Profile from '@/components/profile/Profile';
import { serverApiFetch } from '@/lib/server-api-client';
import { User } from '@/types/User';

export default async function page() {
  const user = await serverApiFetch<User>('/users/me', { method: 'GET' });
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
