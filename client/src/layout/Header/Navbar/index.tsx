import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import theme from '@/theme';
import { Logo } from '@/components';
import UserMenu from './UserMenu';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

type NavbarProps = {
  headerHeight: number;
};

const Navbar: React.FC<NavbarProps> = ({ headerHeight }) => {
  const isMobile = useMediaQuery({ query: theme.device.laptop });
  const [showFixed, setShowFixed] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const limit = headerHeight;

      setScrollDirection(currentY > lastScrollY ? 'down' : 'up');
      setScrollY(currentY);

      if (currentY > limit && currentY > lastScrollY) {
        setShowFixed(false);
      } else if (currentY > limit && currentY < lastScrollY) {
        setShowFixed(true);
      } else if (currentY <= limit) {
        setShowFixed(false);
      }

      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Wrapper
      $isFixed={showFixed}
      $isHidden={scrollY > 400 && scrollDirection === 'down'}
    >
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

const Wrapper = styled.nav<{ $isFixed: boolean; $isHidden: boolean }>`
  background: ${theme.colors.white};
  position: ${({ $isFixed }) => ($isFixed ? 'fixed' : 'sticky')};
  top: ${({ $isHidden }) => ($isHidden ? '-100px' : '0')};
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.$9};
  box-shadow: 0px 10px 40px rgba(202, 202, 202, 0.2);
  transition:
    top 0.3s ease,
    position 0.3s ease;
`;
