import { FiMail, FiMap, FiPhoneCall } from 'react-icons/fi';

const contactDetailData = [
  {
    title: 'Phone Number',
    text: '(000) 000 0000',
    href: 'tel:(000)0000000',
    icon: <FiPhoneCall />,
  },
  {
    title: 'Email Address',
    text: 'info@rentalcar.com',
    href: 'mailto:info@rentalcar.com',
    icon: <FiMail />,
  },
  {
    title: 'Location',
    text: '367 Hillcrest Lane,USA',
    href: '#',
    icon: <FiMap />,
  },
];

export default contactDetailData;
