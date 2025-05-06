'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import SplitText from '@/components/shared/SplitText';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen purple-blue-animated flex items-center justify-center px-6 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-white">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-md">
          <SplitText
              text="Discover Inclusive Job Opportunities"
            />
         
          </h1>
          <div className="text-lg mb-6 drop-shadow-sm">
            <SplitText
              text="FairPath helps you find jobs with companies that value diversity and equality."
            />
          </div>
          <Link href="/dashboard">
            <Button
              className="text-base px-6 py-3 hover:bg-purple-700"
            >
              Search Jobs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="/group.jpeg"
            alt="Illustration of inclusive work"
            width={650}
            height={650}
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
