import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import theme from '@/theme';
import ClampedText from '../ClampedText';

const Copy = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy the URL:', error);
        toast.error('Failed to copy the URL');
      });
  };

  return (
    <LinkWrapper>
      <ClampedText lineClamp={1}>{currentUrl}</ClampedText>
      <CopyButton onClick={handleCopy}>Copy</CopyButton>
    </LinkWrapper>
  );
};

export default Copy;

const LinkWrapper = styled.div`
  background-color: ${theme.colors.blackGray};
  border-color: ${theme.colors.almostBlack};
  border-radius: 12px;
  padding: ${theme.spacing.$3} ${theme.spacing.$4};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$3};
`;

const CopyButton = styled.button`
  border: 1px solid ${theme.colors.black};
  font-size: ${theme.typography.fontSizes.$2};
  background-color: ${theme.colors.darkBlue};
  color: ${theme.colors.blackGray};
  font-weight: ${theme.typography.fontWeights.semiBold};
  line-height: 36px;
  padding: 0 ${theme.spacing.$5};
  cursor: pointer;
  border-radius: 16px;
  transition: 300ms all ease-in-out;
  &:hover {
    background-color: ${theme.colors.twitterBlue};
  }
`;
