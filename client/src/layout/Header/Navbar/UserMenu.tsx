import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Dropdown, Space } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { FaAngleDown } from 'react-icons/fa6';

import { useLogout } from '@/hooks';
import { RootState } from '@/redux/store';

type MenuItem = {
  key: string;
  label: React.ReactNode;
  icon: React.ReactNode;
};

const UserMenu = () => {
  const logout = useLogout();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const items: MenuItem[] = [
    {
      key: '1',
      label: <Link href="/userDashboard">User Dashboard</Link>,
      icon: <UserOutlined />,
    },
    ...(currentUser?.isAdmin
      ? [
          {
            key: '2',
            label: <Link href="/adminDashboard">Admin Dashboard</Link>,
            icon: <SettingOutlined />,
          },
        ]
      : []),
    {
      key: '3',
      label: <span onClick={logout}>Logout</span>,
      icon: <LogoutOutlined />,
    },
  ].filter(Boolean);

  return (
    <>
      {currentUser ? (
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space size="small">
              My Account
              <FaAngleDown />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <Link href="/login">
          <Space size="small">
            <UserOutlined /> Login
          </Space>
        </Link>
      )}
    </>
  );
};

export default UserMenu;
