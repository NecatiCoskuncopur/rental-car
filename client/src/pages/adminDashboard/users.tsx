import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Table } from 'antd';

import { useDeleteData, useFetchData } from '@/hooks';
import { AdminLayout, DeleteModal, UserColumns } from '@/components';

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: usersData, loading, error, refetch } = useFetchData<IUserData>(`/api/user/getUsers?limit=6&page=${currentPage}`);

  const {
    state: { error: deleteError, loading: deleteLoading },
    deleteItem,
  } = useDeleteData(`/api/user/deleteUser/${selectedUser}`);

  const showDeleteModal = (userId: string) => {
    setSelectedUser(userId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      const isDeleted = await deleteItem();
      if (isDeleted) {
        toast.success('User deleted successfully');
        refetch();
      } else {
        toast.error(deleteError || 'Failed to delete user');
      }
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const dataSource = usersData
    ? usersData.users.map((user: IUser) => ({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        dateofBirth: user.dateofBirth,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    : [];

  const columns = UserColumns(showDeleteModal);

  return (
    <AdminLayout title="Users">
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
            pageSize: usersData?.perPage,
            total: usersData ? usersData.totalUsers : 0,
            onChange: (page) => setCurrentPage(page),
            hideOnSinglePage: true,
            showLessItems: true,
          }}
        />
      )}
      <DeleteModal
        isVisible={isModalVisible}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        loading={deleteLoading}
        type="user"
      />
    </AdminLayout>
  );
};

export default Users;
