import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

import theme from '@/theme';
import Logo from '@/components/Logo';

type NavbarProps = {
  navItems: {
    key: string;
    icon: React.JSX.Element;
    label: React.JSX.Element;
    href?: string;
  }[];
  isMenuOpen: boolean;
  closeModal: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ navItems, isMenuOpen, closeModal }) => {
  const pathname = usePathname();
  return (
    <>
      <Container>
        <Logo />
        <ul>
          {navItems.map((item) => (
            <ListItem
              isActive={item.href === pathname}
              key={item.key}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </ListItem>
          ))}
        </ul>
      </Container>

      {isMenuOpen && (
        <ModalWrapper onClick={closeModal}>
          <ContentWrapper
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Logo />
            <ul>
              {navItems.map((item) => (
                <ListItem
                  isActive={item.href === pathname}
                  key={item.key}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </ListItem>
              ))}
            </ul>
          </ContentWrapper>
        </ModalWrapper>
      )}
    </>
  );
};

export default Navbar;

const Container = styled.div`
  width: 270px;
  padding: ${theme.spacing.$5};
  height: calc(100vh - 40px);
  background-color: ${theme.colors.white};
  border-radius: 18px;
  position: sticky;
  top: 20px;
  left: 20px;
  ul {
    margin-top: ${theme.spacing.$10};
  }
  @media ${theme.device.desktop} {
    display: none;
  }
`;

const ListItem = styled.li.withConfig({ shouldForwardProp: (props) => props !== 'isActive' })<{ isActive: boolean }>`
  padding: ${theme.spacing.$5};
  display: flex;
  gap: ${theme.spacing.$5};
  cursor: pointer;
  transition: 300ms all ease;
  color: ${(props) => (props.isActive ? theme.colors.infoBlue : theme.colors.blackGray)};
  &:hover {
    color: ${theme.colors.infoBlue};
  }
`;

const ModalWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100vh;
  width: 270px;
  padding: ${theme.spacing.$5};
  background-color: ${theme.colors.white};
  ul {
    margin-top: ${theme.spacing.$10};
  }
`;
