import { Booking, Dashboard, Settings } from '@/icons';

const userDashboardHeaderData = [
  {
    name: 'Dashboard',
    href: '/userDashboard',
    icon: <Dashboard />,
  },
  {
    name: 'My Bookings',
    href: '/userBookings',
    icon: <Booking />,
  },

  {
    name: 'Settings',
    href: '/settings',
    icon: <Settings />,
  },
];

export default userDashboardHeaderData;
