import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Form, Radio } from 'antd';

import theme from '@/theme';
import { formatDate } from '@/utils';
import Button from './Button';

type OrderDetailProps = {
  pickupDate?: string | string[];
  returnDate?: string | string[];
  vehicle: IVehicle | null;
};

const OrderDetail: React.FC<OrderDetailProps> = ({ pickupDate, returnDate, vehicle }) => {
  const normalizeDate = (date: string | string[] | undefined): string | undefined => {
    if (!date) return undefined;
    return Array.isArray(date) ? date[0] : date;
  };

  const getTotalDays = (start: string | string[] | undefined, end: string | string[] | undefined): number => {
    const startDateStr = normalizeDate(start);
    const endDateStr = normalizeDate(end);

    if (!startDateStr || !endDateStr) return 0;

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays > 0 ? diffInDays : 0;
  };

  const totalDay = getTotalDays(pickupDate, returnDate);
  return (
    <Wrapper>
      <h1>Your Order</h1>

      <p>
        <span>Brand: </span>
        {vehicle?.brand}
      </p>
      <p>
        <span>Model: </span>
        {vehicle?.model}
      </p>
      <p>
        <span>Pick Up Date: </span>
        {formatDate(normalizeDate(pickupDate) || '')}
      </p>
      <p>
        <span>Drop Off Date: </span>
        {formatDate(normalizeDate(returnDate) || '')}
      </p>
      <p>
        <span>Price: </span>${vehicle?.price}
      </p>
      <p>
        <span>Total Day: </span>
        {totalDay}
      </p>
      <Total>
        <p>Total</p>
        <span>${vehicle && vehicle?.price * totalDay}</span>
      </Total>
      <Payment>
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[{ required: true, message: 'Please select a payment method' }]}
        >
          <Radio.Group>
            <StyledRadio value="bank">Direct bank transfer</StyledRadio>
            <StyledRadio value="check">Check payments</StyledRadio>
            <StyledRadio value="cash">Cash on delivery</StyledRadio>
          </Radio.Group>
        </Form.Item>
      </Payment>
      <p>
        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
        <Link
          href="/privacyPolicy"
          target="_blank"
        >
          Privacy policy.
        </Link>
      </p>

      <StyledFormItem>
        <Button
          colorVariant="light"
          size="cozy"
          type="submit"
          fullWidth={true}
        >
          Place Order
        </Button>
      </StyledFormItem>
    </Wrapper>
  );
};

export default OrderDetail;

const Wrapper = styled.div`
  padding: ${theme.spacing.$8};
  border: 1px solid ${theme.colors.coolGray};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.$5};
  font-family: 'Fira Sans', sans-serif;
  font-size: ${theme.typography.fontSizes.$3};
  h1 {
    font-size: ${theme.typography.fontSizes.$5};
    font-weight: ${theme.typography.fontWeights.bold};
    margin-bottom: ${theme.spacing.$5};
    color: ${theme.colors.blackGray};
  }
  p {
    color: ${theme.colors.gray};
    margin-bottom: ${theme.spacing.$3};
    a {
      color: ${theme.colors.coolSurf};
      &:hover {
        color: ${theme.colors.black};
      }
    }
  }
  span {
    color: ${theme.colors.black};
  }
`;

const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${theme.spacing.$5};
  margin-top: ${theme.spacing.$5};
  border-top: 1px solid ${theme.colors.coolGray};
  font-size: ${theme.typography.fontSizes.$3};
  div,
  span {
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const Payment = styled.div`
  margin: ${theme.spacing.$6} 0;
  border-bottom: 1px solid ${theme.colors.coolGray};
`;

const StyledRadio = styled(Radio)`
  display: flex;
  align-items: center;
`;

const StyledFormItem = styled(Form.Item)`
  margin-top: ${theme.spacing.$8};
`;
