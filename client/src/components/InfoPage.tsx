import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import theme from '@/theme';
import Container from './Container';

type InfoPageProps = {
  htmlContent: string;
};

const InfoPage: React.FC<InfoPageProps> = ({ htmlContent }) => {
  return (
    <Container>
      <Content dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </Container>
  );
};

export default InfoPage;

const Content = styled(motion.div)`
  color: ${theme.colors.darkGray};
  font-size: ${theme.typography.fontSizes.$3};
  p {
    margin-bottom: ${theme.spacing.$9};
  }
  h2 {
    margin-bottom: ${theme.spacing.$3};
    font-weight: ${theme.typography.fontWeights.medium};
    color: ${theme.colors.extraDarkGray};
  }
  ul {
    margin-bottom: ${theme.spacing.$9};
  }
  li {
    margin-bottom: ${theme.spacing.$4};
    padding-left: ${theme.spacing.$7};
    position: relative;
    &::before {
      content: '✔';
      position: absolute;
      left: 0;
      top: 0;
      font-size: ${theme.typography.fontSizes.$1};
      width: 18px;
      height: 18px;
      border-radius: ${theme.borderRadius.round};
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${theme.colors.yellow};
      color: ${theme.colors.white};
    }
  }
`;
