import React from 'react';
import styled, { css } from 'styled-components';

import theme from '@/theme';

type SectionHeadingprops = {
  title: string;
  subtitle: string;
  variant: string;
};

const SectionHeading: React.FC<SectionHeadingprops> = ({ title, subtitle, variant }) => {
  return (
    <Wrapper variant={variant}>
      <TitleWrapper>
        <h1>{title}</h1>
      </TitleWrapper>
      <Subtitle>{subtitle}</Subtitle>
    </Wrapper>
  );
};

export default SectionHeading;

const Wrapper = styled.div.withConfig({ shouldForwardProp: (props) => props !== 'variant' })<{ variant: string }>`
  ${(props) =>
    props.variant === 'light'
      ? css`
          h1,
          p {
            color: ${theme.colors.white};
          }
        `
      : css`
          h1 {
            color: ${theme.colors.blackGray};
          }
          p {
            color: ${theme.colors.darkGray};
          }
        `}
`;

const TitleWrapper = styled.div`
  position: relative;
  text-align: center;
  h1 {
    font-size: ${theme.typography.fontSizes.$9};
    font-weight: ${theme.typography.fontWeights.bold};
    margin-bottom: ${theme.spacing.$9};
  }
  &::after {
    content: '';
    position: absolute;
    background-image: url(/images/titleHead.png);
    background-position: center;
    background-repeat: no-repeat;
    left: 0;
    height: 11px;
    right: 0;
    bottom: -22px;
    z-index: 99;
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.fontSizes.$4};
  margin: 0 auto ${theme.spacing.$11};
  max-width: 430px;
  text-align: center;
`;
