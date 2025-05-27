import React from 'react';
import { TableColumnsType, Space, Typography, Image } from 'antd';

const getPostColumns = (showDeleteModal: (id: string) => void, showUpdateModal: (id: string) => void): TableColumnsType<IPost> => [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Title',
    key: 'title',
    render: (text, record) => record.title,
  },
  {
    title: 'Image',
    key: 'url',
    render: (text, record) => (
      <Image
        width={120}
        height={60}
        src={record.image ? record.image : 'error'}
        alt="media"
        preview={false}
        fallback="/images/noImage.png"
      />
    ),
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

export default getPostColumns;
