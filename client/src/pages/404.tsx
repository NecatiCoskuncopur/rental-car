import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import theme from '@/theme';
import { Button } from '@/components';

const NotFound = () => {
  const mockImage =
    'https://firebasestorage.googleapis.com/v0/b/rental-car-bf85b.appspot.com/o/37594550-f5de-48ea-95e2-143402fe559b_404.png?alt=media&token=5e439dc2-c026-4a02-9160-c15888bf5972';

  return (
    <Wrapper>
      <ImageWrapper>
        <Image
          src={mockImage}
          alt="404"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          style={{ objectFit: 'contain' }}
        />
      </ImageWrapper>
      <h1>Oops! Page not found!</h1>
      <p>The page you requested was not found</p>
      <Link
        href="/"
        passHref
      >
        <Button
          size="spacious"
          colorVariant="light"
        >
          Back To Home
        </Button>
      </Link>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.section`
  padding: ${theme.spacing.$12};
  margin: ${theme.spacing.$11} auto;
  max-width: 600px;
  text-align: center;
  width: 100%;

  h1 {
    color: ${theme.colors.blackGray};
    margin-bottom: ${theme.spacing.$4};
    font-size: ${theme.typography.fontSizes.$7};
    font-weight: ${theme.typography.fontWeights.bold};
  }
  p {
    margin: auto auto ${theme.spacing.$8};
    color: ${theme.colors.darkGray};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: ${theme.spacing.$12};
  width: 100%;
  height: auto;
  position: relative;
  aspect-ratio: 2 / 1;
`;
