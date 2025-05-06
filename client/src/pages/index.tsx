import React from 'react';

import { Footer, Header } from '@/layout';
import { CommonQuestions, FactsByNumber, PostSlide, VehicleSearch, WhyChooseUs } from '@/components';

const Home = () => {
  return (
    <>
      <VehicleSearch />
      <WhyChooseUs />
      <FactsByNumber />
      <PostSlide />
      <CommonQuestions />
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Home;
