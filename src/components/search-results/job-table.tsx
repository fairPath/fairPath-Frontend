'use client';

import React from 'react';
import { motion } from 'framer-motion';
import JobCard from './job-card';
import JobDescription from './job-description';
import { Job } from '@/types/Job';
import { Star } from 'lucide-react';
import axios from 'axios';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface JobTableProps {
  jobs: Job[]; // Replace 'any' with the actual type of your jobs array
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  updateSavedJob: (jobs: Job) => void;
  token: string;
}

const JobTable = ({ jobs, selectedJob, setSelectedJob, updateSavedJob, token }: JobTableProps) => {
  const handleClick = (job: Job, index: number) => {
    const saved = !job.saved;
    const updatedJob = { ...job, saved };
    const saveJob = async () => {
      try {
        const response = await axios.post(
          `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/saved-jobs/save`,
          updatedJob,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data === 'success') {
          updateSavedJob(updatedJob);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Get user failed';
        console.error(message);
      }
    };
    const deleteJob = async () => {
      try {
        const response = await axios.delete(
          `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/saved-jobs/delete`, {
          params: { jobId: job.jobId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data === 'successully deleted') {
          updateSavedJob(updatedJob);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'delete user failed';
        console.error(message);
      }
    };

    if (saved) saveJob();
    else deleteJob();
  };

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
            <div className=" flex fill-purple-600">
              <Star fill={job.saved ? 'purple' : 'none'} onClick={() => handleClick(job, index)} style={{ cursor: 'pointer' }} />
            </div>
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
