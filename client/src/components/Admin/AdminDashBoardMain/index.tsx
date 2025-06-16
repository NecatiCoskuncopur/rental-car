import React from 'react';

import { useFetchData } from '@/hooks';
import { Row, Wrapper } from './style';
import MonthlyIncome from './MonthlyIncome';
import YearlyIncome from './YearlyIncome';
import TableSection from './TableSection';
import TotalCounts from './TotalCounts';
import { bookingColumns, postColumns, vehicleColumns } from './columns';

const AdminDashboardMain = () => {
  const { data: postData, loading: postLoading, error: postError } = useFetchData<IPostData>('/api/post/getPosts?limit=5');

  const { data: bookingData, loading: bookingLoading, error: bookingError } = useFetchData<IBookingData>('/api/booking/getBookings?limit=5');

  const { data: vehicleData, loading: vehicleLoading, error: vehicleError } = useFetchData<IVehicleData>('/api/vehicle/getVehicles?limit=5');

  const { data: usersData, loading, error } = useFetchData<IUserData>('/api/user/getUsers');

  const upcomingBooking = bookingData?.bookings.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    const now = new Date();
    return booking.status === 'pending' && bookingDate > now;
  });

  return (
    <>
      <Row>
        <Wrapper variant="md">
          <MonthlyIncome />
        </Wrapper>
        <Wrapper variant="sm">
          <YearlyIncome />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper variant="md">
          <TableSection
            title="Recent Posts"
            href="/adminDashboard/posts"
            error={postError}
            loading={postLoading}
            data={postData?.posts || []}
            columns={postColumns}
          />
        </Wrapper>
        <Wrapper variant="sm">
          <TableSection
            title="Upcoming Booking"
            href="/adminDashboard/bookings"
            error={bookingError}
            loading={bookingLoading}
            data={upcomingBooking || []}
            columns={bookingColumns}
          />
        </Wrapper>
      </Row>
      <Row>
        <Wrapper variant="md">
          <TableSection
            title="Recent Vehicles"
            href="/adminDashboard/vehicles"
            error={vehicleError}
            loading={vehicleLoading}
            data={vehicleData?.vehicles || []}
            columns={vehicleColumns}
          />
        </Wrapper>

        <TotalCounts
          totalUsers={usersData?.totalUsers}
          totalPosts={postData?.totalPosts}
          totalVehicles={vehicleData?.totalVehicles}
        />
      </Row>
    </>
  );
};

export default AdminDashboardMain;
