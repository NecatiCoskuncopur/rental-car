import { FiBell, FiShield, FiStar, FiUser } from 'react-icons/fi';

const settingsMenuData = [
  {
    name: 'Profile',
    icon: <FiUser />,
    href: '/settings',
  },
  {
    name: 'Security',
    icon: <FiShield />,
    href: '/settings/security',
  },
  {
    name: 'Preferences',
    icon: <FiStar />,
    href: '/settings/preferences',
  },
  {
    name: 'Notifications',
    icon: <FiBell />,
    href: '/settings/notifications',
  },
];

export default settingsMenuData;
