import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import theme from '@/theme';
import { Logo } from '@/components';
import UserMenu from './UserMenu';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

const Navbar = () => {
  const isMobile = useMediaQuery({ query: theme.device.laptop });
  return (
    <Wrapper>
      <Logo />
      {isMobile ? (
        <MobileNavbar />
      ) : (
        <>
          <DesktopNavbar />
          <UserMenu />
        </>
      )}
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  background: ${theme.colors.white};
  position: sticky;
  box-shadow: 0px 10px 40px rgba(202, 202, 202, 0.2);
  left: 0;
  top: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.$9};
`;
