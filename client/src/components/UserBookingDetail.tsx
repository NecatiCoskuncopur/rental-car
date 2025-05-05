import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { formatDate } from '@/utils';
import { RootState } from '@/redux/store';
import theme from '@/theme';

type DetailProps = {
  data: IUserBooking | null;
};

const UserBookingDetail: React.FC<DetailProps> = ({ data }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <>
      <Wrapper>
        <SectionWrapper>
          <h1>Booking Detail</h1>
          <List>
            <ListItem>
              <p>Brand</p>
              <span>{data?.vehicle.brand}</span>
            </ListItem>
            <ListItem>
              <p>Model</p>
              <span>{data?.vehicle.model}</span>
            </ListItem>
            <ListItem>
              <p>Total Amount</p>
              <span>${data?.totalPrice}</span>
            </ListItem>
            <ListItem>
              <p>Start Date</p>
              <span>{data && formatDate(data?.startDate)}</span>
            </ListItem>
            <ListItem>
              <p>End Date</p>
              <span>{data && formatDate(data?.endDate)}</span>
            </ListItem>
            <ListItem>
              <p>Status</p>
              <span>{data?.status}</span>
            </ListItem>
          </List>
        </SectionWrapper>
        <SectionWrapper>
          <h1>Personal Detail</h1>
          <List>
            <ListItem>
              <p>Full Name</p>
              <span>
                {currentUser?.name} {currentUser?.surname}
              </span>
            </ListItem>
            <ListItem>
              <p>Email</p>
              <span>{currentUser?.email}</span>
            </ListItem>
          </List>
        </SectionWrapper>
      </Wrapper>
    </>
  );
};

export default UserBookingDetail;

const Wrapper = styled.div`
  border-radius: 10px;
  background-color: ${theme.colors.bgLighter};
  padding: ${theme.spacing.$5};
  font-family: 'Fira Sans', sans-serif;
  margin-top: ${theme.spacing.$6};
`;

const SectionWrapper = styled.div`
  border-radius: 5px;
  background-color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.$6};
  padding: ${theme.spacing.$5};
  h1 {
    border-bottom: 1px solid ${theme.colors.lightGray};
    margin-bottom: ${theme.spacing.$5};
    padding-bottom: ${theme.spacing.$5};
    color: ${theme.colors.blackGray};
    font-weight: ${theme.typography.fontWeights.medium};
    font-size: ${theme.typography.fontSizes.$4};
  }
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: calc(100% / 3 - 16px);
  p {
    color: ${theme.colors.extraDarkGray};
    font-weight: ${theme.typography.fontWeights.medium};
    font-size: ${theme.typography.fontSizes.$2};
    margin-bottom: ${theme.spacing.$3};
  }
  span {
    color: ${theme.colors.darkGray};
    font-size: ${theme.typography.fontSizes.$2};
    display: block;
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;
