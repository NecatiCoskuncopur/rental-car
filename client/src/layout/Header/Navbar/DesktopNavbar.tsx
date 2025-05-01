import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import theme from '@/theme';
import { headerData } from '@/data';

const DesktopNavbar = () => {
  const pathname = usePathname();

  return (
    <List>
      {headerData.map((item, index) => (
        <ListItem
          active={item.href === pathname}
          key={index}
        >
          <Link href={item.href}>{item.name}</Link>
        </ListItem>
      ))}
    </List>
  );
};

export default DesktopNavbar;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$8};
`;

const ListItem = styled.li.withConfig({ shouldForwardProp: (props) => props !== 'active' })<{ active: boolean }>`
  color: ${(props) => (props.active ? theme.colors.yellow : theme.colors.darkerGray)};
  line-height: 85px;
  font-weight: ${theme.typography.fontWeights.medium};
  transition: 400ms all ease-in-out;
  &:hover {
    color: ${theme.colors.yellow};
  }
`;
