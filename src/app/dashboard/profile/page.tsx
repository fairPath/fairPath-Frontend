import Profile from '@/components/profile/Profile';
import { User } from '@/types/User';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const getUserInfo = async (): Promise<User> => {
  const token = (await cookies()).get('authToken')?.value;
  try {
    const response = await axios.get(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.data) {
      redirect('/login');
    }
    return response.data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Get user failed';
    console.error(message);
    redirect('/login');
  }
};

export default async function page() {
  const user = await getUserInfo();
  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
