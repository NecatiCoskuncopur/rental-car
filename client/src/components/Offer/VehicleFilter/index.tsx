import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

import theme from '@/theme';
import { vehicleFiltersData } from '@/data';
import SelectedFilters from './SelectedFilters';

interface VehicleFilterProps {
  onApplyFilters: (filters: Record<string, any>) => void;
  initialFilters: Record<string, any>;
  resetFilters: () => void;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({ onApplyFilters, initialFilters, resetFilters }) => {
  const [expandedFilters, setExpandedFilters] = useState<{ [key: string]: boolean }>({});
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const toggleExpand = (key: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCheckboxChange = (key: string, option: any) => {
    setSelectedFilters((prev) => {
      const currentOptions = Array.isArray(prev[key]) ? prev[key] : [];
      const newOptions = currentOptions.includes(option) ? currentOptions.filter((item: any) => item !== option) : [...currentOptions, option];

      return {
        ...prev,
        [key]: newOptions,
      };
    });
    setIsFilterApplied(true);
  };

  useEffect(() => {
    if (isFilterApplied) {
      onApplyFilters(selectedFilters);
      setIsFilterApplied(false);
    }
  }, [selectedFilters, isFilterApplied, onApplyFilters]);

  const hasSelectedFilters = Object.values(selectedFilters).some((filter) => filter && (Array.isArray(filter) ? filter.length > 0 : filter !== null));

  return (
    <>
      {hasSelectedFilters && (
        <SelectedFilters
          selectedFilters={selectedFilters}
          resetFilters={resetFilters}
        />
      )}

      {vehicleFiltersData.map((filter) => (
        <PanelContainer key={filter.key}>
          <PanelHeader onClick={() => toggleExpand(filter.key)}>
            {filter.label}
            <ExpandIcon>{expandedFilters[filter.key] ? <FaChevronUp /> : <FaChevronDown />}</ExpandIcon>
          </PanelHeader>
          {expandedFilters[filter.key] && (
            <PanelContent>
              {filter.options.map((option) => (
                <CheckboxWrapper key={option.toString()}>
                  <Checkbox
                    checked={Array.isArray(selectedFilters[filter.key]) && selectedFilters[filter.key].includes(option)}
                    onChange={() => handleCheckboxChange(filter.key, option)}
                  >
                    {option}
                  </Checkbox>
                </CheckboxWrapper>
              ))}
            </PanelContent>
          )}
        </PanelContainer>
      ))}
    </>
  );
};

export default VehicleFilter;

const PanelContainer = styled.div`
  border-bottom: 1px solid ${theme.colors.lightGray};
  margin-bottom: ${theme.spacing.$6};
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${theme.typography.fontSizes.$4};
  padding-bottom: ${theme.spacing.$6};
  cursor: pointer;
`;

const ExpandIcon = styled.div`
  font-size: ${theme.typography.fontSizes.$3};
  width: 16px;
  height: 16px;
`;

const PanelContent = styled.div`
  padding-bottom: ${theme.spacing.$6};
`;

const CheckboxWrapper = styled.div`
  .ant-checkbox-wrapper {
    font-family: 'Fira Sans', sans-serif !important;
    color: ${theme.colors.darkGray};
  }
  &:not(:last-child) {
    margin-bottom: ${theme.spacing.$5};
  }
`;
