'use client';

import { motion } from 'framer-motion';
import JobCard from './job-card';
import JobDescription from './job-description';
import { Job } from '@/types/Job';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface JobTableProps {
  jobs: Job[]; // Replace 'any' with the actual type of your jobs array
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
}

const JobTable = ({ jobs, selectedJob, setSelectedJob }: JobTableProps) => {


  return (
    <>
      <div className="grid grid-cols-1 gap-4 max-h-full overflow-y-auto pr-2">
        {jobs.map((job, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            onClick={() => setSelectedJob(job)}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="bg-white w-lg shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-purple-100  transition-shadow duration-200 cursor-pointer"
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
      <div className="h-full w-2xl overflow-y-scroll">
        <JobDescription job={selectedJob}></JobDescription>
      </div>
    </>
  );
};

export default JobTable;
