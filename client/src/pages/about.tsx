import React from 'react';

import { Footer, Header } from '@/layout';
import { AboutIntro, CommonQuestions, FactsByNumber, WhyChooseUs } from '@/components';

const About = () => {
  return (
    <>
      <AboutIntro />
      <WhyChooseUs />
      <FactsByNumber />
      <CommonQuestions />
    </>
  );
};

About.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default About;
