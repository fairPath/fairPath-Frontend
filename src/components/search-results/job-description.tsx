'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '../../types/Job';

interface JobDescriptionPageProps {
  job: Job | null;
}

const JobDescription = ({ job }: JobDescriptionPageProps) => {
  return (
    <>
      {!job && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-semibold">no job to display...</p>
        </div>
      )}
      {job && (
        <div className="max-w-6xl mx-auto pl-2">
          <Card className="shadow-md">
            <CardContent className="space-y-8">
              <div className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b">
                <h1 className="text-2xl font-semibold">{job.title}</h1>
                <p className="text-muted-foreground">{job.companyName}</p>

                <div className="flex flex-row gap-2">
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground">
                      Posted on{' '}
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'full',
                      }).format(new Date(job.dateCreated))}
                    </p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>

                  <div className="flex justify-end flex-grow">
                    <Button className=" bg-purple-600 hover:bg-blue-600" asChild>
                      <a href={job.redirectUrl} target="_blank" rel="noopener noreferrer">
                        Apply on Adzuna
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-base whitespace-pre-line">{job.jobDescription}</p>
              </div>

              <div className="pt-4 space-y-1">
                <div className="flex flex-row justify-between">
                  <p className="text-lg font-medium">Salary</p>
                  <span className="flex justify-end bg-purple-100 text-purple-800  font-semibold px-3 py-1 rounded-full">
                    Diversity Score: {job.rating} / 5
                  </span>
                </div>

                <p>
                  {job.salaryMin === job.salaryMax
                    ? `$${job.salaryMin.toLocaleString()}`
                    : `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default JobDescription;
