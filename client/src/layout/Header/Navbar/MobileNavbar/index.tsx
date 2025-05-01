import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { BiMenuAltRight } from 'react-icons/bi';

import theme from '@/theme';
import { useLogout } from '@/hooks';
import { headerData } from '@/data';
import { RootState } from '@/redux/store';
import Modal from './Modal';

const MobileNavbar = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = useLogout();
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

  return (
    <>
      <IconWrapper onClick={handleMenuOpen}>
        <BiMenuAltRight size={32} />
      </IconWrapper>
      {isMenuOpen && (
        <Modal closeModal={handleMenuClose}>
          <>
            <ul>
              {headerData.map((item, index) => (
                <ListItem
                  active={item.href === pathname}
                  key={index}
                >
                  <Link href={item.href}>{item.name}</Link>
                </ListItem>
              ))}

              {currentUser ? (
                <>
                  <ListItem active={pathname === '/profile'}>
                    <Link href="/profile">Profile</Link>
                  </ListItem>
                  {currentUser.isAdmin && (
                    <ListItem active={false}>
                      <Link href="/adminDashboard">Admin Dashboard</Link>
                    </ListItem>
                  )}
                  <ListItem
                    active={false}
                    onClick={logout}
                  >
                    Logout
                  </ListItem>
                </>
              ) : (
                <ListItem active={false}>
                  <Link href="/login">Login</Link>
                </ListItem>
              )}
            </ul>
          </>
        </Modal>
      )}
    </>
  );
};

export default MobileNavbar;

const IconWrapper = styled.div`
  color: ${theme.colors.yellow};
  line-height: 85px;
  cursor: pointer;
`;

const ListItem = styled.li.withConfig({ shouldForwardProp: (props) => props !== 'active' })<{ active: boolean }>`
  color: ${(props) => (props.active ? theme.colors.yellow : theme.colors.white)};
  font-size: ${theme.typography.fontSizes.$2};
  font-weight: ${theme.typography.fontWeights.medium};
  padding: ${theme.spacing.$4} ${theme.spacing.$5};
  cursor: pointer;
  transition: 400ms all ease-in-out;
  &:hover {
    color: ${theme.colors.yellow};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${theme.colors.white};
  }
`;
