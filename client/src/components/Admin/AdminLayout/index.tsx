import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { TbMenu } from 'react-icons/tb';

import theme from '@/theme';
import { useLogout } from '@/hooks';
import { adminNavData } from '@/data';
import Navbar from './Navbar';

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const logout = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    if (isMenuOpen) {
      handleMenuClose();
    }
  }, [pathname]);

  const navItems = adminNavData(logout);

  return (
    <Wrapper>
      <Navbar
        isMenuOpen={isMenuOpen}
        navItems={navItems}
        closeModal={handleMenuClose}
      />
      <Content>
        <Header>
          <h1>{title}</h1>
          <IconWrapper onClick={handleMenuOpen}>
            <TbMenu size={24} />
          </IconWrapper>
        </Header>

        {pathname === '/adminDashboard' ? children : <TableWrapper>{children}</TableWrapper>}
      </Content>
    </Wrapper>
  );
};

export default AdminLayout;

const Wrapper = styled.section`
  padding: ${theme.spacing.$6};
  background-color: ${theme.colors.bgExtraLight};
  display: flex;
  gap: ${theme.spacing.$7};
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const IconWrapper = styled.div`
  display: none;
  @media ${theme.device.desktop} {
    display: inline-block;
    cursor: pointer;
  }
`;

const Header = styled.header`
  padding: ${theme.spacing.$7};
  border: 1px solid ${theme.colors.bgMedium};
  border-radius: 18px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.blackGray};
  box-shadow: 0 2px 6px rgba(37, 83, 185, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: ${theme.typography.fontSizes.$6};
    font-weight: ${theme.typography.fontWeights.semiBold};
  }
`;

const TableWrapper = styled.div`
  padding: ${theme.spacing.$9};
  border: 1px solid ${theme.colors.bgMedium};
  border-radius: 18px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.blackGray};
  box-shadow: 0 2px 6px rgba(37, 83, 185, 0.1);
  margin-top: ${theme.spacing.$6};
`;
