import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input, Modal } from 'antd';

import { RootState } from '@/redux/store';

type PasswordChangeProps = {
  handleClose: () => void;
  isModalVisible: boolean;
};

const PasswordChange: React.FC<PasswordChangeProps> = ({ handleClose, isModalVisible }) => {
  const [form] = Form.useForm();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handlePasswordChange = async () => {
    try {
      const values = await form.validateFields();
      const { oldPassword, newPassword, confirmPassword } = values;

      if (newPassword !== confirmPassword) {
        toast.error('New passwords do not match!');
        return;
      }

      const response = await fetch(`/api/user/updateUser/${currentUser?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, password: newPassword }),
      });

      if (response.ok) {
        toast.success('Password changed successfully!');
        handleClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to change password');
      }
    } catch (error) {
      if (error) {
        toast.error('Please fill out all required fields!');
      } else {
        toast.error('An error occurred while changing password.');
      }
    }
  };
  return (
    <Modal
      title="Change Password"
      open={isModalVisible}
      onCancel={handleClose}
      onOk={handlePasswordChange}
      okText="Change Password"
    >
      <Form
        form={form}
        layout="vertical"
        name="change_password"
      >
        <Form.Item
          name="username"
          hidden
          initialValue={currentUser?.email || ''}
        >
          <Input autoComplete="username" />
        </Form.Item>
        <Form.Item
          name="oldPassword"
          label="Current Password"
          rules={[{ required: true, message: 'Please enter your current password!' }]}
        >
          <Input.Password
            placeholder="Enter your current password"
            autoComplete="current-password"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: 'Please enter your new password!' },
            { min: 8, max: 64, message: 'Password must be between 8 and 64 characters!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('oldPassword') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('New password cannot be the same as the old password!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter your new password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your new password"
            autoComplete="new-password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordChange;
