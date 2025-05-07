import React from 'react';
import styled from 'styled-components';

import theme from '@/theme';
import { vehicleFiltersData } from '@/data';

type SelectedFiltersProps = {
  selectedFilters: Record<string, any>;
  resetFilters: () => void;
};

const SelectedFilters: React.FC<SelectedFiltersProps> = ({ selectedFilters, resetFilters }) => {
  const renderSelectedFilters = () => {
    return Object.keys(selectedFilters).map((filterKey) => {
      const selectedOptions = selectedFilters[filterKey];
      if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        return (
          <>
            <Tag key={filterKey}>
              <span>{vehicleFiltersData.find((filter) => filter.key === filterKey)?.label}</span>
              <p>{selectedOptions.join(', ')}</p>
            </Tag>
          </>
        );
      }
      return null;
    });
  };

  const totalSelected = Object.values(selectedFilters).reduce((total, selectedOptions) => {
    if (Array.isArray(selectedOptions)) {
      return total + selectedOptions.length;
    }
    return total;
  }, 0);

  return (
    <Container>
      <h1>Selected Filters ({totalSelected}) </h1>
      {renderSelectedFilters()}
      <Reset onClick={resetFilters}>Reset Filter</Reset>
    </Container>
  );
};

export default SelectedFilters;

const Container = styled.div`
  padding-bottom: ${theme.spacing.$6};
  margin-bottom: ${theme.spacing.$6};
  border-bottom: 1px solid ${theme.colors.lightGray};
  h1 {
    margin-bottom: ${theme.spacing.$5};
    color: ${theme.colors.blackGray};
    font-size: ${theme.typography.fontSizes.$4};
    font-weight: ${theme.typography.fontWeights.medium};
  }
`;

const Tag = styled.div`
  padding: ${theme.spacing.$3};
  border: 1px solid ${theme.colors.softGray};
  border-radius: 12px;
  font-size: ${theme.typography.fontSizes.$1};
  margin-bottom: ${theme.spacing.$4};

  span {
    color: ${theme.colors.darkGray};
  }
  p {
    color: ${theme.colors.blackGray};
  }
`;

const Reset = styled.span`
  display: block;
  font-size: ${theme.typography.fontSizes.$3};
  color: ${theme.colors.red};
  text-align: center;
  cursor: pointer;
  transition: 300ms all ease-in-out;
  &:hover {
    color: ${theme.colors.warningOrange};
  }
`;
