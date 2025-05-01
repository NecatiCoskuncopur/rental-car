import React from 'react';

import { termsData } from '@/data';
import { InfoPage } from '@/components';
import { Footer, Header } from '@/layout';

const Terms = () => {
  return <InfoPage htmlContent={termsData} />;
};

export default Terms;

Terms.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);
