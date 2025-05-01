import React from 'react';

import { InfoPage } from '@/components';
import { Footer, Header } from '@/layout';
import { privacyPolicyData } from '@/data';

const PrivacyPolicy = () => {
  return <InfoPage htmlContent={privacyPolicyData} />;
};

export default PrivacyPolicy;

PrivacyPolicy.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);
