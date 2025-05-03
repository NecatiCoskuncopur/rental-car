import React from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa6';

import theme from '@/theme';

const PaginateNextButton = () => {
  return (
    <IconWrapper>
      <span>Next</span>
      <FaArrowRight />
    </IconWrapper>
  );
};

export default PaginateNextButton;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$3};
`;
