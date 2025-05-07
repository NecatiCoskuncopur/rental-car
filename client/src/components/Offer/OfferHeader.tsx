import React from 'react';
import styled, { css } from 'styled-components';
import { Select } from 'antd';
import { FiGrid, FiList } from 'react-icons/fi';

import theme from '@/theme';
import Container from '../Container';

type OfferHeaderProps = {
  totalVehicles: number | undefined;
  sortOption: string;
  onSortChange: (value: string) => void;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
};

const OfferHeader: React.FC<OfferHeaderProps> = ({ totalVehicles, sortOption, onSortChange, view, onViewChange }) => {
  const sortOptions = [
    { value: 'updatedAt-desc', label: 'Newest' },
    { value: 'updatedAt-asc', label: 'Oldest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  return (
    <Header>
      <StyledContainer>
        <p>
          Showing {totalVehicles} Result{totalVehicles !== 1 ? 's' : ''}
        </p>

        <RightWrapper>
          <Select
            value={sortOption}
            onChange={onSortChange}
            options={sortOptions}
            style={{ width: 200 }}
          />

          <Button
            isActive={view === 'grid'}
            onClick={() => onViewChange('grid')}
          >
            <FiGrid />
          </Button>
          <Button
            isActive={view === 'list'}
            onClick={() => onViewChange('list')}
          >
            <FiList />
          </Button>
        </RightWrapper>
      </StyledContainer>
    </Header>
  );
};

export default OfferHeader;

const Header = styled.header`
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 24px rgba(225, 225, 225, 0.25);
  color: ${theme.colors.gray};
`;

const StyledContainer = styled(Container)`
  padding: ${theme.spacing.$9} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${theme.device.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.$5};
    padding: ${theme.spacing.$9} ${theme.spacing.$5};
  }
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .ant-select {
    height: 40px;
  }
`;

const Button = styled.button.withConfig({ shouldForwardProp: (props) => props !== 'isActive' })<{ isActive: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  font-size: ${theme.typography.fontSizes.$3};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 500ms all ease-in-out;
  ${(props) =>
    props.isActive
      ? css`
          background-color: ${theme.colors.successGreen};
          color: ${theme.colors.white};
        `
      : css`
          background-color: ${theme.colors.lightGray};
          color: ${theme.colors.darkGray};
        `}
  &:hover {
    background-color: ${theme.colors.successGreen};
    color: ${theme.colors.white};
  }
`;
