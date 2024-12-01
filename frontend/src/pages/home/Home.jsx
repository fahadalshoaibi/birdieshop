import React from 'react';
import Banner from './banner';
import BestSellers from './BestSellers';
import ForYou from './ForYou';

const Home = () => {
  return (
    <div>
      <Banner />
      <BestSellers />
      <ForYou />
      {/* Other components or content */}
    </div>
  );
};

export default Home;