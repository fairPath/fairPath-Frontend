'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Job } from '../../types/Job';
//import { format } from 'date-fns';

interface JobDescriptionPageProps {
  job: Job;
}

const JobDescription = ({ job }: JobDescriptionPageProps) => {
  return (
    <div className="max-w-6xl mx-auto pl-2">
      <Card className="shadow-md">
        <CardContent className="space-y-8">
          <div className="sticky top-0 z-10 bg-white pt-4 pb-3 border-b">
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <p className="text-muted-foreground">{job.company.display_name}</p>
       
            <div className="flex flex-row gap-2">
              <div className='flex flex-col'>
              <p className="text-sm text-muted-foreground">
                Posted on {(new Date(job.created), 'MMMM d, yyyy')}
              </p>
              <p className="text-sm text-muted-foreground">
              {job.location.display_name}
            </p>
                </div>
             
              <div className='flex justify-end flex-grow'>
                <Button   className=' bg-purple-600 hover:bg-blue-600' asChild>
                  <a
                    href={job.redirect_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  
                  >
                    Apply on Adzuna
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-base whitespace-pre-line">{job.description}</p>
          </div>

          <div className="pt-4 space-y-1">
            <p className="text-lg font-medium">Salary</p>
            <p>
              {job.salary_min === job.salary_max
                ? `$${job.salary_min.toLocaleString()}`
                : `$${job.salary_min.toLocaleString()} - $${job.salary_max.toLocaleString()}`}
              {job.salary_is_predicted === '1' && ' (Estimated)'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDescription;
