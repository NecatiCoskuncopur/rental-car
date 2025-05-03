import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa6';

import theme from '@/theme';

const PaginatePrevButton = () => {
  return (
    <IconWrapper>
      <FaArrowLeft />
      <span>Prev</span>
    </IconWrapper>
  );
};

export default PaginatePrevButton;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$3};
`;
