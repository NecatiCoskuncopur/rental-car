import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import theme from '@/theme';
import { userDashboardHeaderData } from '@/data';
import Container from './Container';

const UserDashboardHeader = () => {
  const pathname = usePathname();

  return (
    <Wrapper>
      <StyledContainer>
        <List>
          {userDashboardHeaderData.map((item, index) => (
            <ListItem
              active={pathname === item.href || pathname.startsWith(item.href)}
              key={index}
            >
              <Link href={item.href}>
                {item.icon}

                <p>{item.name}</p>
              </Link>
            </ListItem>
          ))}
        </List>
      </StyledContainer>
    </Wrapper>
  );
};

export default UserDashboardHeader;

const Wrapper = styled.div`
  background-color: ${theme.colors.white};
`;

const StyledContainer = styled(Container)`
  padding: ${theme.spacing.$6} ${theme.spacing.$5};
  background-color: ${theme.colors.white};
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.$6};
`;

const ListItem = styled.li.withConfig({ shouldForwardProp: (props) => props !== 'active' })<{ active: boolean }>`
  width: calc(100% / 3 - 20px);
  padding: ${theme.spacing.$6};
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid;
  text-align: center;
  svg {
    margin-bottom: ${theme.spacing.$4};
  }
  a {
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  @media ${theme.device.laptop} {
    width: calc(50% - 10px);
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }

  ${(props) =>
    props.active
      ? css`
          background-color: ${theme.colors.warningOrange};
          color: ${theme.colors.white};
          border-color: ${theme.colors.warningOrange};
        `
      : css`
          background-color: ${theme.colors.bgLighter};
          color: ${theme.colors.darkGray};
          border-color: ${theme.colors.bgLighter};
          transition: 300ms all ease-in-out;
          p {
            transition: 300ms all ease-in-out;
          }
          &:hover {
            background-color: ${theme.colors.white};
            border-color: ${theme.colors.warningOrange};
            p {
              color: ${theme.colors.warningOrange};
            }
          }
        `}
`;
