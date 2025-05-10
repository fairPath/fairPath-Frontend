import { Job } from '@/types/Job';
import { Building2 } from 'lucide-react';


interface JobCardProps {
  job: Job;
}
const JobCard = ({ job }: JobCardProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        {job.title}
        <div className="flex justify-end items-end pr-5 pt-2 ml-5">
          {/* <Image
            src="/zoom.jpg"
            alt="Company Logo"
            width={50}
            height={1}
            className=" ml-2 flex justify-end items-end"
          /> */}
          <Building2/>
        </div>
      </div>

      <div className="text-gray-700 mt-2">{job.companyName}</div>

      <div className="text-gray-500 mt-1">{job.location}</div>
      <div className="pt-1">{`$${job.salaryMin} - $${job.salaryMax}`}</div>
    </>
  );
};

export default JobCard;
