import { Dropdown, Menu, TableColumnsType } from 'antd';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FiEye, FiXCircle } from 'react-icons/fi';

import { formatDate } from '@/utils';
import { MenuButton, Tag } from './styles';

const getUserBookingsColumns = (onView: (record: IUserBooking) => void, onCancel: (record: IUserBooking) => void): TableColumnsType<IUserBooking> => [
  {
    title: 'Vehicle Name',
    dataIndex: ['vehicleBrand', 'vehicleModel'],
    render: (_: any, record: IUserBooking) => `${record.vehicle.brand} ${record.vehicle.model}`,
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    render: (date: string) => formatDate(date),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    render: (date: string) => formatDate(date),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => <Tag status={status}>{status}</Tag>,
  },
  {
    title: 'Total Price',
    dataIndex: 'totalPrice',
    render: (price: number) => `$${price.toFixed(2)}`,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_: any, record: IUserBooking) => {
      const isCancelable = (record.status === 'pending' || record.status === 'confirmed') && new Date(record.startDate) > new Date();

      return (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                label: 'View',
                icon: <FiEye />,
                onClick: () => onView(record),
              },
              isCancelable
                ? {
                    key: 'cancel',
                    label: 'Cancel',
                    icon: <FiXCircle />,
                    danger: true,
                    onClick: () => onCancel(record),
                  }
                : null,
            ].filter((item) => item !== null),
          }}
          trigger={['click']}
        >
          <MenuButton>
            <FaEllipsisVertical />
          </MenuButton>
        </Dropdown>
      );
    },
  },
];

export default getUserBookingsColumns;
