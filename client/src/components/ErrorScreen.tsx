import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import theme from '@/theme';
import Button from './Button';

const ErrorScreen = () => {
  const mockImage =
    'https://firebasestorage.googleapis.com/v0/b/rental-car-bf85b.appspot.com/o/eafe99e9-e752-4c01-86f6-c50f8dece793_500.png?alt=media&token=d3037bd3-1b30-44fd-b672-8c85eae72159';

  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <Image
            src={mockImage}
            alt="500"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
            style={{ objectFit: 'contain' }}
          />
        </ImageWrapper>
        <h1>Unexpected error</h1>

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
    </Container>
  );
};

export default ErrorScreen;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 9999999;
`;

const Wrapper = styled.div`
  padding: ${theme.spacing.$12};
  margin: ${theme.spacing.$11} auto;
  max-width: 600px;
  text-align: center;
  width: 100%;
  h1 {
    color: ${theme.colors.blackGray};
    margin-bottom: ${theme.spacing.$12};
    font-size: ${theme.typography.fontSizes.$7};
    font-weight: ${theme.typography.fontWeights.bold};
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: ${theme.spacing.$12};
  width: 100%;
  height: auto;
  position: relative;
  aspect-ratio: 2 / 1;
`;
