'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import JobTable from '../search-results/job-table';
import { Job } from '@/types/Job';

interface SavedJobsProps {
  jobs: Job[] | undefined;
  token: string;
}
const SavedJobs = ({ jobs, token }: SavedJobsProps) => {
  const router = useRouter();
  const [savedJobs, setSavedJobs] = useState<Job[] | undefined>(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const updateSavedJob = (job: Job) => {
    const updatedJobs = jobs?.map((j) => {
      if (j.jobId === job.jobId) {
        return job;
      } else return j;
    });
    setSavedJobs(updatedJobs);
  };
  return (
    <>
      {!jobs ||
        (jobs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">No saved jobs found</h2>
            <p className="text-gray-500">Try saving jobs on dashboard.</p>
            <Button
              onClick={() => router.push('/dashboard')}
              className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Back to Dashboard
            </Button>
          </div>
        ))}
      {jobs && jobs.length > 0 && (
        <div className="h-screen">
          <div className="flex items-center justify-center gap-x-2 mb-6">
            <div className="text-4xl font-semibold text-foreground">Saved Jobs</div>
          </div>
          <div className=" flex flex-grow justify-center overflow-y-auto">
            <JobTable
              jobs={savedJobs || []}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              updateSavedJob={updateSavedJob}
              token={token}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SavedJobs;
