import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Image
        src="/not-found.svg"
        alt="Illustration of inclusive work"
        width={700}
        height={700}
        className="rounded-xl shadow-lg mb-6"
      />
      <Link href="/dashboard">Return Home</Link>
    </div>
  );
}
