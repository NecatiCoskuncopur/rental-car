import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { PuffLoader } from 'react-spinners';

import theme from '@/theme';

const Loader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <Container>
      <PuffLoader
        color={theme.colors.yellow}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Container>
  );
};

export default Loader;

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  background-color: ${theme.colors.white};
`;
