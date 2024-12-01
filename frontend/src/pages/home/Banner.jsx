import React from 'react';
import bannerImg from '../../assets/banner.jpg';

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row py-16 justify-between items-center gap-12'>
      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>WELCOME TO SMARTBIRD</h1>
        <p className='mb-10 '>Get the best products at the best prices while experiencing the maximum customer satisfaction, be smart and shop with smartbird</p>
      
      <button className='btn-primary'>
        Join smartbird
      </button>
      </div>
      <div className='md:w-1/10 w-1/4 flex items-center md:justify-end'>
        <img src={bannerImg} alt='banner' className='w-full' />
      </div>
    </div>
  );
};

export default Banner;
