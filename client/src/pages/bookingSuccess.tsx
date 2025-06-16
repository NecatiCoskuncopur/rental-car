import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import theme from '@/theme';
import { Button } from '@/components';

const BookingSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    document.cookie = 'bookingSuccessAllowed=; Max-Age=0; path=/';
  }, []);

  return (
    <Wrapper>
      <AiOutlineCheckCircle
        size={60}
        color="green"
      />
      <Content>
        <p>Booking successful! Thank you for your reservation.</p>
        <Button
          size="spacious"
          colorVariant="light"
          onClick={() => router.push('/userBookings')}
        >
          View My Bookings
        </Button>
      </Content>
    </Wrapper>
  );
};

export default BookingSuccess;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: ${theme.spacing.$4};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.spacing.$3};

  p {
    font-size: ${theme.typography.fontSizes.$6};
    font-weight: ${theme.typography.fontWeights.semiBold};
    color: ${theme.colors.extraDarkGray};
  }
`;
