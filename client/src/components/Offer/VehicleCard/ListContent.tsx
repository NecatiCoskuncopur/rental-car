import React from 'react';
import styled from 'styled-components';
import { FiCalendar } from 'react-icons/fi';

import theme from '@/theme';
import { vehicleDetailsData } from '@/data';
import Button from './Button';

type DetailsConfigItem = {
  key: keyof IVehicle;
  icon: React.JSX.Element;
  label: string;
};

type ListContentProps = {
  vehicle: IVehicle;
  showModal: () => void;
};

const ListContent: React.FC<ListContentProps> = ({ vehicle, showModal }) => {
  const groupedDetails = vehicleDetailsData.reduce<DetailsConfigItem[][]>((acc, curr, index) => {
    if (index % 2 === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  const formatValue = (value: string | number | Date | undefined) => {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return value ?? 'N/A';
  };

  return (
    <Content>
      <Header>
        <h2>
          {vehicle.brand} {vehicle.model}
        </h2>
        <Price>
          ${vehicle.price} <span>/ Day</span>
        </Price>
      </Header>
      <List>
        {groupedDetails.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((item) => (
              <ListItem key={item.key}>
                {item.icon}
                <p>{formatValue(vehicle[item.key])}</p>
              </ListItem>
            ))}
          </Row>
        ))}
      </List>
      <Button
        view="list"
        onClick={showModal}
      >
        <FiCalendar />
        <span>Rent Now</span>
      </Button>
    </Content>
  );
};

export default ListContent;

const Content = styled.div`
  width: 100%;
  h2 {
    font-size: ${theme.typography.fontSizes.$5};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.$5};
  color: ${theme.colors.extraDarkGray};
`;

const Price = styled.h1`
  color: ${theme.colors.red};
  font-size: ${theme.typography.fontSizes.$6};
  font-weight: ${theme.typography.fontWeights.bold};
  span {
    font-size: ${theme.typography.fontSizes.$2};
    color: ${theme.colors.gray};
  }
`;

const List = styled.ul`
  padding-bottom: ${theme.spacing.$5};
  margin-bottom: ${theme.spacing.$5};
  border-bottom: 1px solid ${theme.colors.lightGray};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: ${theme.colors.bgLighter};
  padding: ${theme.spacing.$4};
  &:not(:first-child) {
    margin-top: ${theme.spacing.$3};
  }
`;

const ListItem = styled.li`
  font-size: ${theme.typography.fontSizes.$2};
  color: ${theme.colors.darkShark};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.$3};
`;
