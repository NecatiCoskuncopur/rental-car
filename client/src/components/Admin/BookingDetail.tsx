import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import { formatDate } from '@/utils';
import theme from '@/theme';

type BookingDetailProps = {
  data: IBooking | null;
};

const BookingDetail: React.FC<BookingDetailProps> = ({ data }) => {
  const mergedDetailData = [
    {
      section: 'Vehicle Detail',
      image: data?.vehicle?.image,
      imageAlt: data?.vehicle?.model,
      data: [
        { title: 'Brand', key: 'brand', value: data?.vehicle?.brand ?? '-' },
        { title: 'Model', key: 'model', value: data?.vehicle?.model ?? '-' },
        { title: 'Vehicle Type', key: 'vehicleType', value: data?.vehicle?.vehicleType ?? '-' },
        { title: 'Transmission Type', key: 'transmissionType', value: data?.vehicle?.transmissionType ?? '-' },
        { title: 'Fuel Type', key: 'fuelType', value: data?.vehicle?.fuelType ?? '-' },
        { title: 'Drive Age', key: 'minAge', value: data?.vehicle?.minAge ?? '-' },
        { title: 'Doors', key: 'doors', value: data?.vehicle?.doors ?? '-' },
        { title: 'Passengers', key: 'passengers', value: data?.vehicle?.passengers ?? '-' },
      ],
    },
    {
      section: 'User Detail',
      data: [
        {
          title: 'Full Name',
          key: 'fullName',
          value: data?.user?.name && data?.user?.surname ? `${data.user.name} ${data.user.surname}` : (data?.user?.name ?? data?.user?.surname ?? '-'),
        },
        { title: 'Email', key: 'email', value: data?.user?.email ?? '-' },
      ],
    },
    {
      section: 'Booking Detail',
      data: [
        { title: 'Pickup Date', key: 'startDate', value: data?.startDate ? formatDate(data.startDate) : '-' },
        { title: 'Return Date', key: 'endDate', value: data?.endDate ? formatDate(data.endDate) : '-' },
        { title: 'Total Amount', key: 'totalPrice', value: data?.totalPrice ? `$${data.totalPrice}` : '-' },
      ],
    },
  ];

  return (
    <>
      {mergedDetailData.map((section) => (
        <div key={section.section}>
          <TitleWrapper>
            <h1>{section.section}</h1>
          </TitleWrapper>

          <List>
            {section.image && (
              <ListItem>
                <Image
                  src={section.image}
                  alt={section.imageAlt || 'Vehicle Image'}
                  width={120}
                  height={80}
                />
              </ListItem>
            )}
            {section.data.map((item) => (
              <ListItem key={item.key}>
                <p>{item.title}</p>
                <span>{item.value}</span>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </>
  );
};

export default BookingDetail;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: ${theme.spacing.$7};
  flex-wrap: wrap;
  border: 2px solid ${theme.colors.lightGray};
  padding: ${theme.spacing.$5};
  &:last-child {
    margin-bottom: ${theme.spacing.$7};
  }
`;

const TitleWrapper = styled.div`
  margin: ${theme.spacing.$10} 0 ${theme.spacing.$5};
  color: ${theme.colors.extraDarkGray};
`;

const ListItem = styled.li`
  width: calc(100% / 3 - 16px);
  p {
    color: ${theme.colors.extraDarkGray};
    font-weight: ${theme.typography.fontWeights.medium};
    font-size: ${theme.typography.fontSizes.$2};
    margin-bottom: ${theme.spacing.$2};
  }
  span {
    color: ${theme.colors.darkGray};
    font-size: ${theme.typography.fontSizes.$2};
    text-transform: capitalize;
  }
  @media ${theme.device.tablet} {
    width: 100%;
  }
`;
