import { Book, Expenses, Wallet } from '@/icons';
import theme from '@/theme';

type DashboardDataParams = {
  totalBookings: number;
  totalSpent: number;
  totalApprovedSpent: number;
};

const getUserDashboardData = ({ totalBookings, totalSpent, totalApprovedSpent }: DashboardDataParams) => [
  {
    title: 'My Bookings',
    icon: <Book size={35} />,
    iconBg: theme.colors.coolSurf,
    value: totalBookings,
    footerText: 'View All Bookings',
    href: '/userBookings',
  },
  {
    title: 'Total Transactions',
    icon: <Wallet size={35} />,
    iconBg: theme.colors.orange,
    value: `$${new Intl.NumberFormat().format(totalSpent)}`,
    footerText: 'View all Transactions',
    href: '/',
  },
  {
    title: 'Verified Expenses',
    icon: <Expenses size={35} />,
    iconBg: theme.colors.successGreen,
    value: `$${new Intl.NumberFormat().format(totalApprovedSpent)}`,
    footerText: 'View all Expenses',
    href: '/',
  },
];

export default getUserDashboardData;
