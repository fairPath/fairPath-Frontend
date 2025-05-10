import { Job } from '@/types/Job';
import { Building2, Star } from 'lucide-react';

interface JobCardProps {
  job: Job;
}
const JobCard = ({ job }: JobCardProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {job.title}
        <div className="flex justify-end items-end pr-5 pt-2 ml-5">
          <Building2 />
        </div>
      </div>

      <div className="text-gray-700 mt-2">{job.companyName}</div>

      <div className="text-gray-500 mt-1">{job.location}</div>
      <div className="flex flex-row gap-2 mt-2 justify-between">
        <div className="pt-1">{`$${job.salaryMin} - $${job.salaryMax}`}</div>
        <div className=" flex fill-purple-600">
          <Star fill={job.rating >= 1 ? 'purple' : 'none'} />
          <Star fill={job.rating >= 2 ? 'purple' : 'none'} />
          <Star fill={job.rating >= 3 ? 'purple' : 'none'} />
          <Star fill={job.rating >= 4 ? 'purple' : 'none'} />
          <Star fill={job.rating >= 5 ? 'purple' : 'none'} />
        </div>
      </div>
    </>
  );
};

export default JobCard;
