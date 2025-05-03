import React from 'react';
import styled from 'styled-components';
import { Card, Skeleton } from 'antd';

import theme from '@/theme';
import { Wrapper } from './styles';

const CardLayout = () => {
  return (
    <StyledWrapper>
      {Array.from({ length: 4 }).map((_, index) => (
        <StyledCard key={index}>
          <Skeleton
            active
            paragraph={{ rows: 3 }}
          />
        </StyledCard>
      ))}
    </StyledWrapper>
  );
};

export default CardLayout;

const StyledWrapper = styled(Wrapper)`
  margin-top: ${theme.spacing.$11};
`;

const StyledCard = styled(Card)`
  width: calc(25% - 18px);
  @media ${theme.device.laptop} {
    width: calc(50% - 12px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;
