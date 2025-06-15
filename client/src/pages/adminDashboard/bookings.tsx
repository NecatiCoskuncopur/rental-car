import { Alert, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useFetchData } from '@/hooks';
import { AdminLayout, BookingColumns, BookingDetail } from '@/components';

type ModalType = 'delete' | 'detail' | null;

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const { data: bookingData, loading, error, refetch } = useFetchData<IBookingData>(`/api/booking/getBookings?limit=5&page=${currentPage}`);

  const openModal = (type: ModalType, bookingId?: string) => {
    if (bookingId) {
      const booking = bookingData?.bookings.find((b) => b._id === bookingId) || null;

      setSelectedBooking(booking);
    } else {
      setSelectedBooking(null);
    }
    setModalType(type);
  };

  const handleUpdate = async (bookingId: string, status: string) => {
    try {
      const response = await fetch(`/api/booking/updateBooking/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update booking.');
      }

      toast.success(status === 'cancelled' ? 'Booking has been successfully cancelled.' : 'Booking has been confirmed successfully.');
      refetch();
    } catch (error: any) {
      toast.error(status === 'cancel' ? `Error cancelling booking: ${error.message}` : `Error confirming booking: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setModalType(null);
    setSelectedBooking(null);
  };

  const dataSource = bookingData?.bookings
    ? bookingData.bookings.map((booking: IBooking) => ({
        _id: booking._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        status: booking.status,
        totalPrice: booking.totalPrice,
        vehicle: booking.vehicle,
        user: booking.user,
      }))
    : [];

  const columns = BookingColumns(
    (bookingId) => openModal('detail', bookingId),
    (bookingId, status) => handleUpdate(bookingId, status)
  );

  return (
    <AdminLayout title="Bookings">
      {error ? (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      ) : (
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="_id"
          scroll={{ x: 1024 }}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: bookingData?.perPage,
            total: bookingData ? bookingData.totalBookings : 0,
            onChange: (page) => setCurrentPage(page),
            hideOnSinglePage: true,
            showLessItems: true,
          }}
        />
      )}

      {modalType === 'detail' && (
        <Modal
          open={modalType === 'detail'}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <BookingDetail data={selectedBooking} />
        </Modal>
      )}
    </AdminLayout>
  );
};

export default Bookings;
