import Link from 'next/link';
import { FaUsers, FaCamera, FaCar, FaBook, FaChartPie, FaRegBookmark } from 'react-icons/fa6';
import { LiaSignOutAltSolid } from 'react-icons/lia';

const adminNavData = (logout: () => void) => [
  {
    key: '1',
    icon: <FaChartPie />,
    label: <Link href="/adminDashboard">Dashboard</Link>,
    href: '/adminDashboard',
  },
  {
    key: '2',
    icon: <FaRegBookmark />,
    label: <Link href="/adminDashboard/bookings">Bookings</Link>,
    href: '/adminDashboard/bookings',
  },

  {
    key: '3',
    icon: <FaBook />,
    label: <Link href="/adminDashboard/posts">Posts</Link>,
    href: '/adminDashboard/posts',
  },
  {
    key: '4',
    icon: <FaUsers />,
    label: <Link href="/adminDashboard/users">Users</Link>,
    href: '/adminDashboard/users',
  },
  {
    key: '5',
    icon: <FaCar />,
    label: <Link href="/adminDashboard/vehicles">Vehicles</Link>,
    href: '/adminDashboard/vehicles',
  },
  {
    key: '6',
    icon: <LiaSignOutAltSolid />,
    label: <span onClick={logout}>Logout</span>,
  },
];

export default adminNavData;
