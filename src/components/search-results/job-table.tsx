'use client';

import { motion } from 'framer-motion';
import JobCard from './job-card';
import JobDescription from './job-description';

const mockJob = {
  id: '5048227128',
  title: 'Licensed Practical Nurse LPN',
  description:
    'Grande Prairie Care rande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Carerande Prairie Careand Rehab Center rande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Centerrande Prairie Care and Rehab Center- Licensed Practical Nurse LPN\n\nNewly Increased Wages\nShift Differential Pay\nWeekend Differential Pay\nDailyPay Options\n\nGrande Prairie Care and Rehab Center is a pillar in the community of Pleasant Prairie, WI. We approach every day with one goal: To improve the lives we touch through high-quality healthcare and extraordinary compassion.\n\nWhy work for us?\n- Competitive Wages\n- Engaged Management Team\n- You will have the opportunity to build a career with an established company\n\nApply today to join our team!',
  salary_min: 54576.79,
  salary_max: 54576.79,
  salary_is_predicted: '1',
  created: '2025-02-13T07:03:32Z',
  redirect_url:
    'https://www.adzuna.com/details/5048227128?utm_medium=api&utm_source=7d4f3da8',
  company: {
    display_name: 'Grande Prairie Care and Rehab Center',
  },
  location: {
    display_name: 'Pleasant Prairie, Kenosha County',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const JobTable = () => {
  const cards = Array.from({ length: 40 }, (_, i) => i); // mock data

  return (
    <>
    <div className="grid grid-cols-1 gap-4 max-h-full overflow-y-auto pr-2">
        {cards.map((_, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:bg-purple-100  transition-shadow duration-200 cursor-pointer"
          >
            <JobCard />
          </motion.div>
        ))}
      </div>
      <div className="h-full w-2xl overflow-y-scroll">
        <JobDescription job={mockJob}></JobDescription>
      </div>
    </>
  );
};

export default JobTable;
