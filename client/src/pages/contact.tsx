import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Footer, Header } from '@/layout';
import { ContactDetail, ContactForm, ContactMap } from '@/components';

const Contact = () => {
  return (
    <>
      <ContactDetail />
      <BottomWrapper>
        <ContactForm />
        <ContactMap />
      </BottomWrapper>
    </>
  );
};

Contact.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Contact;

const BottomWrapper = styled(motion.div)`
  box-shadow: 0px 4px 24px rgba(225, 225, 225, 0.25);
  display: flex;
  flex-wrap: wrap;
`;
