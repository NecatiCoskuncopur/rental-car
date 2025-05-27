import React from 'react';
import { Modal, Typography } from 'antd';

type DeleteModalProps = {
  isVisible: boolean;
  handleDelete: () => Promise<void>;
  handleCancel: () => void;
  loading: boolean;
  type: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isVisible, handleDelete, handleCancel, loading, type }) => {
  const title = 'Delete' + ' ' + type.slice(0, 1).toUpperCase() + type.slice(1);

  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={handleDelete}
      onCancel={handleCancel}
      okText="Delete"
      cancelText="Cancel"
      confirmLoading={loading}
      okType="danger"
    >
      <Typography.Text type="danger">{`Are you sure you want to delete this ${type}? This action cannot be undone.`}</Typography.Text>
    </Modal>
  );
};

export default DeleteModal;
