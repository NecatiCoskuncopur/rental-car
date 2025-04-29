import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';
import { Container } from '@/components';

const FooterBottom = () => {
  return (
    <Wrapper>
      <StyledContainer>© 2025 Rental Car. All Rights Reserved.</StyledContainer>
    </Wrapper>
  );
};

export default FooterBottom;

const Wrapper = styled.div`
  width: 100%;
  background-color: ${theme.colors.almostBlack};
  font-size: ${theme.typography.fontSizes.$2};
  color: ${theme.colors.darkGray};
`;

const StyledContainer = styled(Container)`
  padding: ${theme.spacing.$6} ${theme.spacing.$3};
`;
