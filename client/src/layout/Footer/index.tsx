import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';
import { Container } from '@/components';
import Contact from './Contact';
import FooterBottom from './FooterBottom';
import FooterLinks from './FooterLinks';

const Footer = () => {
  return (
    <Wrapper>
      <FlexContainer>
        <FooterLinks />
        <Contact />
      </FlexContainer>
      <FooterBottom />
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  background-color: ${theme.colors.extraDarkGray};
  width: 100%;
`;

const FlexContainer = styled(Container)`
  padding: ${theme.spacing.$13} ${theme.spacing.$5};
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
`;
