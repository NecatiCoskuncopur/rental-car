import { ContactMap } from '@/components';
import { Footer, Header } from '@/layout';
import React from 'react';

const Contact = () => {
  return (
    <>
      <ContactMap />
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
