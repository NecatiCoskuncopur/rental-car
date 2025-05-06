import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal, Typography } from 'antd';

import { useDeleteData, useLogout } from '@/hooks';
import { RootState } from '@/redux/store';

type DeleteAccountProps = {
  handleClose: () => void;
  isModalVisible: boolean;
};

const DeleteAccount: React.FC<DeleteAccountProps> = ({ handleClose, isModalVisible }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const logout = useLogout();

  const {
    state: { error: deleteError, loading: deleteLoading },
    deleteItem,
  } = useDeleteData(`/api/user/deleteUser/${currentUser?._id}`);

  const handleDelete = async () => {
    const isDeleted = await deleteItem();
    if (isDeleted) {
      toast.success('User deleted successfully');
      logout();
    } else {
      toast.error(deleteError || 'Failed to delete user');
    }
    handleClose();
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleClose}
      onOk={handleDelete}
      okText="Delete"
      cancelText="Cancel"
      okType="danger"
      title="Delete Account"
    >
      <Typography.Text type="danger">Are you sure you want to delete your account? This cannot be undone.</Typography.Text>
    </Modal>
  );
};

export default DeleteAccount;
