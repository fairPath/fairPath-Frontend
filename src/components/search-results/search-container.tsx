'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { LocateFixedIcon, Search } from 'lucide-react';
import JobFilters from './job-filters';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';


const SearchContainer = () => {
   const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
  const [searchRole, setSearchRole] = useState<string>(searchQuery || '');
  const [searchLocation, setSearchLocation] = useState<string>('');

  return (
    <div>
      <div className="flex items-center justify-center gap-x-2 relative">
        <Search className="absolute left-150 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Job Role..."
          value={searchRole}
          onChange={(e) => setSearchRole(e.target.value)}
          className="w-1/8 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <LocateFixedIcon className="absolute left-205 text-muted-foreground" />
        <Input
          type="text"
          placeholder="City, state, or zip code..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-1/8 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Search
        </Button>
      </div>

      <div>
        <div className="flex flex-wrap justify-center">
          {/* Job Type Filter */}
          <JobFilters />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
