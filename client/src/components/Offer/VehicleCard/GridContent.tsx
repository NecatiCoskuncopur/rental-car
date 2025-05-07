import React from 'react';
import styled from 'styled-components';
import { FiCalendar } from 'react-icons/fi';

import theme from '@/theme';
import { vehicleDetailsData } from '@/data';
import Button from './Button';

type GridContentProps = {
  vehicle: IVehicle;
  showModal: () => void;
};

const GridContent: React.FC<GridContentProps> = ({ vehicle, showModal }) => {
  const formatValue = (value: string | number | Date | undefined) => {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return value ?? 'N/A';
  };
  return (
    <>
      <VehicleTitle>
        {vehicle.brand} {vehicle.model}
      </VehicleTitle>
      <DetailsList>
        {vehicleDetailsData.map((item, index) => (
          <li
            key={index}
            title={item.label}
          >
            {item.icon}
            <span>{formatValue(vehicle[item.key])}</span>
          </li>
        ))}
      </DetailsList>
      <Price>
        <h1>
          ${vehicle.price} <span>/ Day</span>
        </h1>
      </Price>
      <Button
        view="grid"
        onClick={showModal}
      >
        <FiCalendar />
        <span>Rent Now</span>
      </Button>
    </>
  );
};

export default GridContent;

const VehicleTitle = styled.h1`
  color: ${theme.colors.blackGray};
  padding-bottom: ${theme.spacing.$5};
  margin-bottom: ${theme.spacing.$5};
  border-bottom: 1px solid ${theme.colors.lightGray};
  font-size: ${theme.typography.fontSizes.$5};
  font-weight: ${theme.typography.fontWeights.medium};
`;

const DetailsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: ${theme.spacing.$3};
  margin-bottom: ${theme.spacing.$5};
  li {
    width: calc(100% / 3 - 6px);
    display: flex;
    align-items: center;
    gap: ${theme.spacing.$3};
    color: ${theme.colors.darkGray};
    span {
      font-size: ${theme.typography.fontSizes.$2};
      text-transform: capitalize;
    }
  }
`;

const Price = styled.div`
  padding: ${theme.spacing.$3};
  margin-bottom: ${theme.spacing.$5};
  background-color: ${theme.colors.bgLighter};
  h1 {
    color: ${theme.colors.red};
    padding: 0;
    margin: 0;
    border-bottom: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: ${theme.typography.fontSizes.$6};
    font-weight: ${theme.typography.fontWeights.bold};
    span {
      color: ${theme.colors.darkGray};
      font-size: ${theme.typography.fontSizes.$2};
      font-weight: ${theme.typography.fontWeights.normal};
      line-height: 0;
    }
  }
`;
