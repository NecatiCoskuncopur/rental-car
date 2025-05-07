import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Result, Typography } from 'antd';
import { useRouter } from 'next/router';

import theme from '@/theme';
import { useFetchData } from '@/hooks';
import { Footer, Header } from '@/layout';
import { Container, ErrorScreen, OfferHeader, OverlayLoader, VehicleFilter } from '@/components';

type FilterState = {
  vehicleTypes: string[];
  fuelTypes: string[];
  transmissionTypes: string[];
  minAge: number | null;
  passengers: number | null;
};

const initialFilterState: FilterState = {
  vehicleTypes: [],
  fuelTypes: [],
  transmissionTypes: [],
  minAge: null,
  passengers: null,
};

const Offer = () => {
  const router = useRouter();
  const { pickup: pickupDate, return: returnDate } = router.query;
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [sortOption, setSortOption] = useState('updatedAt-desc');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const { data: vehiclesData, loading, error } = useFetchData<IVehicleData>(apiUrl || '');

  const applyFilters = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
  };

  useEffect(() => {
    if (pickupDate && returnDate) {
      let url = `/api/vehicle/getVehicles?startDate=${pickupDate}&endDate=${returnDate}`;

      if (filterState.vehicleTypes?.length) {
        url += `&vehicleType=${filterState.vehicleTypes.join(',')}`;
      }
      if (filterState.fuelTypes?.length) {
        url += `&fuelType=${filterState.fuelTypes.join(',')}`;
      }
      if (filterState.transmissionTypes?.length) {
        url += `&transmissionType=${filterState.transmissionTypes.join(',')}`;
      }
      if (filterState.minAge !== undefined) {
        url += `&minAge=${filterState.minAge}`;
      }
      if (filterState.passengers !== undefined) {
        url += `&passengers=${filterState.passengers}`;
      }

      const [sortBy, order] = sortOption.split('-');
      url += `&sortBy=${sortBy}&order=${order}`;

      setApiUrl(url);
    } else {
      setApiUrl(null);
    }
  }, [pickupDate, returnDate, filterState, sortOption]);

  if (error) return <ErrorScreen />;

  return (
    <>
      <OfferHeader
        totalVehicles={vehiclesData?.totalVehicles}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        view={view}
        onViewChange={(newView) => setView(newView)}
      />
      <Container>
        {!apiUrl || loading ? (
          <OverlayLoader variant="leftAside" />
        ) : (
          <Wrapper>
            <Aside>
              <VehicleFilter
                initialFilters={filterState}
                onApplyFilters={applyFilters}
                resetFilters={resetFilters}
              />
            </Aside>
            {vehiclesData?.vehicles.length === 0 && (
              <NotFound>
                <Result
                  status="404"
                  title="404"
                  subTitle="Unfortunately, we couldn't find any offers that match your filter setting."
                  extra={<Typography.Link onClick={resetFilters}>Clear Filters</Typography.Link>}
                />
              </NotFound>
            )}
            <List>{vehiclesData?.vehicles?.map((vehicle) => <div key={vehicle._id}>{vehicle.brand}</div>)}</List>
          </Wrapper>
        )}
      </Container>
    </>
  );
};

Offer.getLayout = (page: React.ReactElement) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export default Offer;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: ${theme.spacing.$7};
`;

const List = styled.ul`
  width: calc(75% - 12px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${theme.spacing.$7};
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

const Aside = styled.aside`
  width: calc(25% - 12px);
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 24px rgba(255, 255, 255, 0.2);
  padding: ${theme.spacing.$6};
  border-radius: 10px;
  @media screen and (min-width: 1024px) {
    position: sticky;
    top: 20px;
    left: 0;
  }
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;

const NotFound = styled.div`
  width: calc(75% - 12px);
  @media ${theme.device.laptop} {
    width: 100%;
  }
`;
