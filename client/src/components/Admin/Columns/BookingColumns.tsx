import React from 'react';
import styled, { css } from 'styled-components';
import { TableColumnsType, Space, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import theme from '@/theme';
import { formatDate } from '@/utils';

const getBookingColumns = (showDetailModal: (id: string) => void, handleUpdate: (id: string, status: string) => void): TableColumnsType<IBooking> => [
  {
    title: 'Vehicle Name',
    dataIndex: ['vehicleBrand', 'vehicleModel'],
    render: (_: any, record: IBooking) => `${record.vehicle.brand} ${record.vehicle.model}`,
  },
  {
    title: 'User',
    dataIndex: ['userName', 'userSurname'],
    render: (_: any, record: IBooking) => `${record.user.name} ${record.user.surname}`,
  },
  {
    title: 'Date',
    dataIndex: ['startDate', 'endDate'],
    render: (_: any, record) => (
      <Space
        size="small"
        direction="vertical"
      >
        <Space size="small">
          <strong>Pickup:</strong>
          {formatDate(record.startDate)}
        </Space>
        <Space size="small">
          <strong>Return:</strong>
          {formatDate(record.endDate)}
        </Space>
      </Space>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (_: any, record) =>
      record.status === 'pending' ? (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <IconButton
                onClick={() => handleUpdate(record._id, 'confirmed')}
                title="Confirm Booking"
              >
                <CheckOutlined style={{ color: 'green' }} />
              </IconButton>
              <IconButton
                onClick={() => handleUpdate(record._id, 'cancelled')}
                title="Cancel Booking"
              >
                <CloseOutlined style={{ color: 'red' }} />
              </IconButton>
            </>
          )}
        </Space>
      ) : (
        <Tag status={record.status}>{record.status}</Tag>
      ),
  },

  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (_: any, record) => (
      <Space size="middle">
        <Typography.Link onClick={() => showDetailModal(record._id)}>View</Typography.Link>
      </Space>
    ),
  },
];

export default getBookingColumns;

const Tag = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  font-size: ${theme.typography.fontSizes.$2};
  padding: ${theme.spacing.$3} ${theme.spacing.$2};
  border-radius: 5px;
  ${(props) =>
    props.status === 'pending'
      ? css`
          background-color: rgba(255, 147, 7, 0.1);
          color: ${theme.colors.orange};
        `
      : props.status === 'confirmed'
        ? css`
            background-color: rgba(31, 188, 47, 0.1);
            color: ${theme.colors.successGreen};
          `
        : css`
            background-color: rgba(255, 0, 0, 0.1);
            color: ${theme.colors.red};
          `}
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
