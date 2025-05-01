import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

import theme from '@/theme';

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <Container onClick={closeModal}>
      <ContentWrapper
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: '0%', opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalHeader>
          <IoClose
            size={24}
            onClick={closeModal}
          />
          Logo
        </ModalHeader>
        {children}
      </ContentWrapper>
    </Container>
  );
};

export default Modal;

const Container = styled.section`
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
  right: 0;
  z-index: 999;
  height: 100vh;
  width: 50%;
  background-color: ${theme.colors.extraDarkGray};
`;

const ModalHeader = styled.header`
  background-color: ${theme.colors.white};
  color: ${theme.colors.yellow};
  padding: 0 ${theme.spacing.$6};
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`;
