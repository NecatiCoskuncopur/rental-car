import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';

import { RootState } from '@/redux/store';
import GridContent from './GridContent';
import ListContent from './ListContent';

import theme from '@/theme';

type VehicleCardProps = {
  vehicle: IVehicle;
  view: 'grid' | 'list';
  pickupDate?: string | string[];
  returnDate?: string | string[];
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, view, pickupDate, returnDate }) => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const handleLoginRedirect = () => {
    closeModal();
    router.push('/login');
  };

  const handleBooking = () => {
    if (!pickupDate || !returnDate) return;
    router.push({
      pathname: `/checkout/${vehicle._id}`,
      query: {
        pickupDate: String(pickupDate),
        returnDate: String(returnDate),
      },
    });
  };

  const showModal = () => {
    if (currentUser) {
      handleBooking();
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <>
      <ListItem view={view}>
        <ImageWrapper view={view}>
          <Image
            src={vehicle.image || ''}
            alt={vehicle.model}
            fill
            priority={true}
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: 'contain' }}
          />
        </ImageWrapper>
        {view === 'grid' ? (
          <GridContent
            vehicle={vehicle}
            showModal={showModal}
          />
        ) : (
          <ListContent
            vehicle={vehicle}
            showModal={showModal}
          />
        )}
      </ListItem>
      {!currentUser && isModalOpen && (
        <Modal
          title="You need to log in to make a reservation."
          open={isModalOpen}
          onOk={handleLoginRedirect}
          onCancel={closeModal}
          okText="Login"
          cancelText="Cancel"
        />
      )}
    </>
  );
};

export default VehicleCard;

const ListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'view',
})<{ view: string }>`
  padding: ${theme.spacing.$5};
  background-color: ${theme.colors.white};
  border-radius: 10px;

  ${(props) =>
    props.view === 'grid'
      ? css`
          width: calc(50% - 12px);
          @media ${theme.device.tablet} {
            width: 100%;
          }
        `
      : css`
          display: flex;
          align-items: flex-start;
          gap: ${theme.spacing.$4};
          width: 100%;
          @media ${theme.device.tablet} {
            flex-direction: column;
          }
        `}
`;

const ImageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'view',
})<{ view: string }>`
  position: relative;
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: ${theme.spacing.$5};

  ${(props) =>
    props.view === 'list' &&
    css`
      max-width: 350px;
      @media ${theme.device.tablet} {
        max-width: 100%;
      }
    `}
`;
