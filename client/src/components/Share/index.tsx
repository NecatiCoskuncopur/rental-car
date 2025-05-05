import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { FiShare2 } from 'react-icons/fi';

import theme from '@/theme';
import Copy from './Copy';
import ShareToPlatform from './ShareToPlatform';

const SocialShare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ShareWrapper onClick={showModal}>
        <button>
          <FiShare2 />
        </button>
        <span>Share</span>
      </ShareWrapper>
      <StyledModal
        title="Share"
        open={isModalOpen}
        onCancel={handleCancel}
        className="custom-modal"
        footer={null}
      >
        <ShareToPlatform />
        <Copy />
      </StyledModal>
    </>
  );
};

export default SocialShare;

const StyledModal = styled(Modal)`
  color: ${theme.colors.white};

  .ant-modal-content,
  .ant-modal-title {
    background-color: ${theme.colors.extraDarkGray};
    color: ${theme.colors.white};
  }

  .ant-modal-close {
    color: ${theme.colors.white};
    &:hover {
      color: unset;
    }
  }
`;

const ShareWrapper = styled.div`
  padding: ${theme.spacing.$9} 0;
  border-top: 1px solid ${theme.colors.bgMedium};
  border-bottom: 1px solid ${theme.colors.bgMedium};
  margin: ${theme.spacing.$6} 0;
  display: flex;
  align-items: center;
  width: 100%;
  gap: ${theme.spacing.$3};
  cursor: pointer;
  button {
    width: 45px;
    height: 45px;
    background-color: ${theme.colors.coolSurf};
    color: ${theme.colors.white};
    font-size: ${theme.typography.fontSizes.$5};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  span {
    font-size: ${theme.typography.fontSizes.$4};
    color: ${theme.colors.darkerGray};
  }
  &:hover {
    button {
      background-color: ${theme.colors.warningOrange};
    }
    span {
      color: ${theme.colors.coolSurf};
    }
  }
`;
