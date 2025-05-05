'use client';
import { useState } from 'react';
import Search from '../../components/dashboard/Search';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className='flex justify-center items-center min-h-screen'>

      Welcome to the Dashboard! <br />
      {/* <Search
        onSearch={(query: string) => {
          setSearchQuery(query);
        }}
      /> */}
    </div>
  );
}
