import React from 'react';
import styled from 'styled-components';
import { FaUserGroup, FaRegNewspaper, FaCar } from 'react-icons/fa6';

import theme from '@/theme';

type TotalCountProps = {
  totalUsers: number | undefined;
  totalPosts: number | undefined;
  totalVehicles: number | undefined;
};

const TotalCounts: React.FC<TotalCountProps> = ({ totalUsers, totalPosts, totalVehicles }) => {
  const data = [
    {
      icon: <FaUserGroup />,
      value: totalUsers,
      title: 'Users',
    },
    {
      icon: <FaRegNewspaper />,
      value: totalPosts,
      title: 'Posts',
    },
    {
      icon: <FaCar />,
      value: totalVehicles,
      title: 'Vehicles',
    },
  ];
  return (
    <List>
      {data.map((item, index) => (
        <ListItem key={index}>
          <IconWrapper>{item.icon}</IconWrapper>
          <div>
            <Title>{item.title}</Title>
            <p>{item.value}</p>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default TotalCounts;

const List = styled.ul`
  width: calc(33.3333% - 12px);
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.$7};
  @media ${theme.device.desktop} {
    width: 100%;
  }
`;

const ListItem = styled.li`
  padding: ${theme.spacing.$9};
  border: 1px solid ${theme.colors.bgMedium};
  border-radius: 18px;
  background-color: ${theme.colors.white};
  box-shadow: 0 2px 6px rgba(37, 83, 185, 0.1);
  height: calc(100% / 3 - 12px);
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$5};
  p {
    color: ${theme.colors.blackGray};
    margin-top: ${theme.spacing.$3};
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.coolSurf};
  color: ${theme.colors.white};
  font-size: ${theme.typography.fontSizes.$5};
`;

const Title = styled.h3`
  color: ${theme.colors.gray};
  font-weight: ${theme.typography.fontWeights.semiBold};
  font-size: ${theme.typography.fontSizes.$3};
`;
