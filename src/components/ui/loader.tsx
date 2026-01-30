// src/components/Loader.jsx

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../public/loader.json'; // Update the path as needed

const Loader = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <Lottie animationData={animationData} loop={true} autoplay={true} />
    </div>
  );
};

export default Loader;