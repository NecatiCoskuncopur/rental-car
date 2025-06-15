import React from 'react';
import { TableColumnsType, Space, Typography, Image } from 'antd';

const getVehicleColumns = (showDeleteModal: (id: string) => void, showUpdateModal: (id: string) => void): TableColumnsType<IVehicle> => [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Image',
    key: 'url',
    render: (text, record) => (
      <Image
        width={100}
        height={60}
        src={record.image}
        alt="media"
        preview={false}
        fallback="/images/noImage.png"
      />
    ),
  },
  {
    title: 'Vehicle Type',
    dataIndex: 'vehicleType',
    key: 'vehicleType',
  },

  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Typography.Link
          type="danger"
          onClick={() => showDeleteModal(record._id)}
        >
          Delete
        </Typography.Link>
        <Typography.Link onClick={() => showUpdateModal(record._id)}>Update</Typography.Link>
      </Space>
    ),
  },
];

export default getVehicleColumns;
