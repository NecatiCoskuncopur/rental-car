import { formatDate } from '@/utils';

const postColumns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
];

const bookingColumns = [
  {
    title: 'Date',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (startDate: string) => formatDate(startDate),
  },
  {
    title: 'Vehicle Name',
    dataIndex: ['vehicleBrand', 'vehicleModel'],
    render: (_: any, record: IBooking) => `${record.vehicle.brand} ${record.vehicle.model}`,
  },
];

const vehicleColumns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Model',
    dataIndex: 'model',
    key: 'model',
  },
];

export { postColumns, bookingColumns, vehicleColumns };
