import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';
import { VehicleSearch } from '@/components';

const Hero = () => {
  const mockImage = 'https://dreamsrent-wp.dreamstechnologies.com/wp-content/uploads/2023/12/banner.jpg';

  return (
    <Wrapper imageUrl={mockImage}>
      <div style={{ height: '400px' }}></div>
      <VehicleSearch />
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'imageUrl',
})<{ imageUrl: string }>`
  position: relative;
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  padding: ${theme.spacing.$15} 0;
`;
