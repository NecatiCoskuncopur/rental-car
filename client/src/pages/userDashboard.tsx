import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

import theme from '@/theme';
import { useFetchData } from '@/hooks';
import { Footer, Header } from '@/layout';
import { getUserDashboardData } from '@/data';
import { Container, ErrorScreen, OverlayLoader, UserDashboardHeader } from '@/components';

const UserDashboard = () => {
  const { data, loading: bookingLoading, error: bookingError } = useFetchData<IUserBookingData>(`/api/user/getUser/bookings`);

  const totalSpent = data?.bookings?.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const totalApprovedSpent =
    data?.bookings?.filter((booking) => booking.status === 'confirmed').reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const dashboardData = getUserDashboardData({
    totalBookings: data?.totalBookings,
    totalSpent: totalSpent,
    totalApprovedSpent: totalApprovedSpent,
  });

  if (bookingError) return <ErrorScreen />;

  return (
    <>
      <UserDashboardHeader />
      <StyledContainer>
        <h1>Dashboard</h1>
        {bookingLoading ? (
          <OverlayLoader variant="card" />
        ) : (
          <List>
            {dashboardData.map((item) => (
              <ListItem key={item.title}>
                <TopWrapper>
                  <div>
                    <h3>{item.title}</h3>
                    <h2>{item.value}</h2>
                  </div>
                  <IconWrapper bg={item.iconBg}>{item.icon}</IconWrapper>
                </TopWrapper>
                <StyledLink href={item.href}>
                  {item.footerText}

                  <FiArrowRight />
                </StyledLink>
              </ListItem>
            ))}
          </List>
        )}
      </StyledContainer>
    </>
  );
};

UserDashboard.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default UserDashboard;

const StyledContainer = styled(Container)`
  h1 {
    font-size: ${theme.typography.fontSizes.$9};
    font-weight: ${theme.typography.fontWeights.bold};
  }
  h2 {
    font-size: ${theme.typography.fontSizes.$7};
    font-weight: ${theme.typography.fontWeights.bold};
    margin-bottom: ${theme.spacing.$5};
    color: ${theme.colors.blackGray};
  }
  h3 {
    color: ${theme.colors.darkGray};
    margin-bottom: ${theme.spacing.$2};
    font-size: ${theme.typography.fontSizes.$4};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const List = styled.ul`
  margin: ${theme.spacing.$11} 0 ${theme.spacing.$7};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  border: 1px solid ${theme.colors.lightGray};
  background-color: ${theme.colors.almostWhite};
  box-shadow: 0px 4px 24px 0px rgba(225, 225, 225, 0.25);
  padding: ${theme.spacing.$7};
  width: calc(100% / 3 - 24px);
  @media ${theme.device.laptop} {
    width: calc(50% - 12px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.softGray};
`;

const IconWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'bg',
})<{ bg: string }>`
  width: 65px;
  height: 65px;
  border-radius: 60px 0px 60px 60px;
  padding: ${theme.spacing.$5};
  background-color: ${(props) => (props.bg ? props.bg : 'unset')};
  color: ${theme.colors.white};
`;

const StyledLink = styled(Link)`
  font-size: ${theme.typography.fontSizes.$3};
  color: ${theme.colors.coolSurf};
  margin-top: ${theme.spacing.$5};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$2};
  transition: 300ms all ease-in-out;

  &:hover {
    color: ${theme.colors.warningOrange};
  }
`;
