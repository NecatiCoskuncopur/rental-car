import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

import theme from '@/theme';
import { formatDate } from '@/utils';
import Button from './Button';
import Container from './Container';

const VehicleSearch = () => {
  const router = useRouter();

  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);

  const disabledPickupDate = (current: Dayjs) => {
    return current && current <= dayjs().endOf('day');
  };

  const disabledReturnDate = (current: Dayjs) => {
    if (!pickupDate) return current && current <= dayjs().endOf('day');
    return current && current <= dayjs(pickupDate);
  };

  const handleFindVehicle = () => {
    if (!pickupDate || !returnDate) {
      toast.error('Please select both pickup and return dates.');
      return;
    }

    router.push({
      pathname: '/offer',
      query: { pickup: pickupDate, return: returnDate },
    });
  };

  return (
    <StyledContainer>
      <Wrapper>
        <Field>
          <Label htmlFor="pickup-date">Pickup Date</Label>
          <DatePicker
            id="pickup-date"
            showTime={false}
            placeholder=""
            format={(date: Dayjs) => formatDate(date.toISOString())}
            disabledDate={disabledPickupDate}
            onChange={(date: Dayjs | null) => {
              if (date) {
                const formatted = date.format('YYYY-MM-DD');
                setPickupDate(formatted);

                if (returnDate && dayjs(formatted).isAfter(dayjs(returnDate))) {
                  setReturnDate(null);
                }
              } else {
                setPickupDate(null);
              }
            }}
          />
        </Field>

        <Field>
          <Label htmlFor="return-date">Return Date</Label>
          <DatePicker
            id="return-date"
            placeholder=""
            showTime={false}
            format={(date: Dayjs) => formatDate(date.toISOString())}
            disabledDate={disabledReturnDate}
            value={returnDate ? dayjs(returnDate) : null}
            onChange={(date: Dayjs | null) => {
              if (date) {
                setReturnDate(date.format('YYYY-MM-DD'));
              } else {
                setReturnDate(null);
              }
            }}
          />
        </Field>

        <Button
          colorVariant="light"
          hasIcon={true}
          size="spacious"
          onClick={handleFindVehicle}
        >
          <FaSearch />
          Search
        </Button>
      </Wrapper>
    </StyledContainer>
  );
};

export default VehicleSearch;

const StyledContainer = styled(Container)`
  padding: 0;
`;

const Wrapper = styled.div`
  background-color: ${theme.colors.white};
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  padding: ${theme.spacing.$7};
  width: 75%;
  box-shadow: 0px 4px 24px rgba(225, 225, 225, 0.25);
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.$7};

  @media ${theme.device.laptop} {
    flex-direction: column;
    bottom: -140px;
  }

  @media ${theme.device.tablet} {
    width: 95%;
  }
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSizes.$2};
  color: ${theme.colors.darkerGray};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.$3};
  width: 100%;
`;
