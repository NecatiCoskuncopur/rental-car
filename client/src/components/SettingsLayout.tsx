import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import theme from '@/theme';
import { settingsMenuData } from '@/data';
import Container from './Container';
import UserDashboardHeader from './UserDashboardHeader';

type SettingsLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children, title }) => {
  const pathname = usePathname();

  return (
    <>
      <UserDashboardHeader />
      <Container>
        <Title>Settings</Title>
        <Wrapper>
          <Aside>
            {settingsMenuData.map((item) => (
              <Link
                href={item.href}
                key={item.name}
              >
                <MenuItem
                  key={item.name}
                  isActive={pathname === item.href}
                >
                  <p>{item.icon}</p>
                  {item.name}
                </MenuItem>
              </Link>
            ))}
          </Aside>
          <ContentWrapper>
            <TitleWrapper>
              <h2>{title}</h2>
            </TitleWrapper>
            {children}
          </ContentWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default SettingsLayout;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: ${theme.spacing.$7};
  margin-top: ${theme.spacing.$5};
`;

const Aside = styled.aside`
  width: calc(25% - 12px);

  @media screen and (min-width: 1024px) {
    position: sticky;
    top: 20px;
    left: 0;
  }
  @media ${theme.device.laptop} {
    width: 100%;
  }
  a {
    margin-bottom: ${theme.spacing.$5};
  }
`;

const MenuItem = styled.div.withConfig({ shouldForwardProp: (props) => props !== 'isActive' })<{ isActive: boolean }>`
  padding: ${theme.spacing.$3};
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: ${theme.typography.fontSizes.$3};
  gap: ${theme.spacing.$3};
  cursor: pointer;

  transition: 400ms all ease-in-out;
  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.warningOrange};
  }
  ${(props) =>
    props.isActive
      ? css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.warningOrange};
        `
      : css`
          background-color: ${theme.colors.bgLighter};
          color: ${theme.colors.darkGray};
        `}
`;

const Title = styled.h1`
  font-size: ${theme.typography.fontSizes.$9};
  font-weight: ${theme.typography.fontWeights.bold};
`;

const ContentWrapper = styled.div`
  padding-left: ${theme.spacing.$6};
  border-left: 1px solid ${theme.colors.softGray};
  width: calc(75% - 12px);
  @media ${theme.device.laptop} {
    width: 100%;
    border: none;
    padding: 0;
  }
`;

const TitleWrapper = styled.div`
  margin-bottom: ${theme.spacing.$6};
  padding-bottom: ${theme.spacing.$6};
  border-bottom: 1px solid ${theme.colors.softGray};
  color: ${theme.colors.blackGray};
  font-size: ${theme.typography.fontSizes.$6};
  font-weight: ${theme.typography.fontWeights.semiBold};
`;
