import Image from 'next/image';

const JobCard = () => {
  return (
    <>
      <div className="flex items-center">
        Senior Software Engineer
        <div className="flex justify-end items-end pt-2 ml-5">
          <Image
            src="/zoom.jpg"
            alt="Company Logo"
            width={50}
            height={1}
            className=" ml-2 flex justify-end items-end"
          />
        </div>
      </div>

      <div className="text-gray-700 mt-2">Zoom</div>

      <div className="text-gray-500 mt-1">San Jose, CA</div>
      <div className='pt-1'>140k-200k</div>
    </>
  );
};

export default JobCard;
