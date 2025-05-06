import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Form } from 'antd';
import { toast } from 'react-toastify';

import { Footer, Header } from '@/layout';
import { RootState } from '@/redux/store';
import { Profile, SettingsLayout } from '@/components';
import { updateUserFailure, updateUserStart, updateUserSuccess } from '@/redux/userSlice';

const Settings = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm();
  const formRef = useRef(form);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        name: currentUser.name,
        surname: currentUser.surname,
        dateofBirth: currentUser.dateofBirth ? dayjs(currentUser.dateofBirth) : null,
        email: currentUser.email,
      });
    }
  }, [currentUser, form]);

  const handleSubmit = async (values: { name: string; surname: string; dateofBirth: dayjs.Dayjs; email: string }) => {
    if (!currentUser) return;

    const changedValues: Partial<typeof currentUser> = {};

    if (values.name !== currentUser.name) {
      changedValues.name = values.name;
    }

    if (values.surname !== currentUser.surname) {
      changedValues.surname = values.surname;
    }

    if (values.email !== currentUser.email) {
      changedValues.email = values.email;
    }

    const originalDate = currentUser.dateofBirth;
    const newDate = values.dateofBirth;

    if (!dayjs(originalDate).isSame(newDate)) {
      changedValues.dateofBirth = newDate.toISOString();
    }

    if (Object.keys(changedValues).length === 0) {
      toast.warning('No changes have been made.');
      console.log(values);
      return;
    }

    dispatch(updateUserStart());

    try {
      const response = await fetch(`/api/user/updateUser/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedValues),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      const data = await response.json();
      dispatch(updateUserSuccess(data));
      toast.success('Profile updated successfully!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(updateUserFailure(errorMessage));
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <SettingsLayout title="Profile">
      <Form
        form={form}
        name="profile"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        ref={formRef}
      >
        <Profile form={form} />
      </Form>
    </SettingsLayout>
  );
};

Settings.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Settings;
