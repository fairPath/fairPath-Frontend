'use client';

import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="w-full bg-gray-100 text-center text-sm text-gray-600 py-4">
      © {new Date().getFullYear()} FairPath. All rights reserved.
      <a
        onClick={() => router.push('/about')}
        className="text-blue-500 hover:underline ml-1"
      >
        About
      </a>
    </footer>
  );
}
