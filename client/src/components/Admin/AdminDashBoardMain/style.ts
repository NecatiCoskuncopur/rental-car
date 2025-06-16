import styled from 'styled-components';
import { Typography } from 'antd';

import theme from '@/theme';

const Wrapper = styled.div.withConfig({ shouldForwardProp: (props) => props !== 'variant' })<{ variant: 'lg' | 'md' | 'sm' }>`
  padding: ${theme.spacing.$9};
  border: 1px solid ${theme.colors.bgMedium};
  border-radius: 18px;
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 6px rgba(37, 83, 185, 0.1);
  width: ${({ variant }) => (variant === 'lg' ? '100%' : variant === 'md' ? 'calc(66.6667% - 12px)' : 'calc(33.3333% - 12px)')};

  @media ${theme.device.desktop} {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${theme.spacing.$5};
`;

const Row = styled.div`
  display: flex;
  gap: ${theme.spacing.$7};
  flex-wrap: wrap;
  margin: ${theme.spacing.$7} 0;
`;

const Link = styled(Typography.Link)`
  font-size: ${theme.typography.fontSizes.$3};
  font-family: 'Fira Sans', sans-serif;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
`;

export { Wrapper, Header, Row, Link, Image };
