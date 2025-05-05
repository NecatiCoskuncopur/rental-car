import React from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { Modal, Table, Typography } from 'antd';

import { Footer, Header } from '@/layout';
import { useFetchData, useUpdateData } from '@/hooks';
import { Container, ErrorScreen, getUserBookingsColumns, OverlayLoader, UserBookingDetail, UserDashboardHeader } from '@/components';

const UserBookings = () => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) || 1;
  const pageSize = 10;

  const [selectedBooking, setSelectedBooking] = React.useState<IUserBooking | null>(null);
  const [actionType, setActionType] = React.useState<'view' | 'cancel' | null>(null);

  const { data, loading, error, refetch } = useFetchData<IUserBookingData>(`/api/user/getUser/bookings?limit=${pageSize}&page=${page}`);

  const { loading: updateLoading, error: updateError, update } = useUpdateData<IUserBooking>(`/api/booking/updateBooking/${selectedBooking?._id}`);

  const openModal = (record: IUserBooking, action: 'view' | 'cancel') => {
    setSelectedBooking(record);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setActionType(null);
  };

  const handleCancelBooking = async () => {
    if (selectedBooking) {
      try {
        const updatedData = { status: 'cancelled' };
        await update(updatedData);

        if (!updateError) {
          toast.success('Booking has been successfully cancelled.');
          closeModal();
          refetch();
        } else {
          throw new Error(updateError || 'Failed to cancel booking.');
        }
      } catch (error: any) {
        toast.error(`Error cancelling booking: ${error.message}`);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/userBookings?page=${newPage}`);
  };

  if (error) return <ErrorScreen />;

  const dataSource = data
    ? data.bookings.map((item: IUserBooking) => ({
        _id: item._id,
        startDate: item.startDate,
        endDate: item.endDate,
        status: item.status,
        totalPrice: item.totalPrice,
        vehicle: item.vehicle,
      }))
    : [];

  const columns = getUserBookingsColumns(
    (record: IUserBooking) => openModal(record, 'view'),
    (record: IUserBooking) => openModal(record, 'cancel')
  );

  return (
    <>
      <UserDashboardHeader />
      {loading ? (
        <OverlayLoader variant="table" />
      ) : (
        <Container>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            scroll={{ x: 1024 }}
            loading={loading}
            pagination={{
              current: data?.currentPage ?? 1,
              pageSize: data?.perPage ?? 10,
              total: data?.totalBookings ?? 0,
              onChange: handlePageChange,
              hideOnSinglePage: true,
              showLessItems: true,
            }}
          />
          <Modal
            open={!!selectedBooking && actionType === 'cancel'}
            onCancel={closeModal}
            onOk={handleCancelBooking}
            okText="Confirm Cancel"
            cancelText="Close"
            title="Cancel Booking"
            loading={updateLoading}
            okType="danger"
          >
            <Typography.Text type="danger">Are you sure you want to delete this booking? This action cannot be undone.</Typography.Text>
          </Modal>
          <Modal
            open={!!selectedBooking && actionType === 'view'}
            onCancel={closeModal}
            footer={null}
            width={800}
          >
            <UserBookingDetail data={selectedBooking} />
          </Modal>
        </Container>
      )}
    </>
  );
};

export default UserBookings;

UserBookings.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);
