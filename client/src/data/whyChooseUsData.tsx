import theme from '@/theme';
import { Crown, Selection, UserCheck } from '@/icons';

const whyChooseUsData = [
  {
    title: 'Easy & Fast Booking',
    text: 'Our intuitive booking system ensures a seamless experience, allowing you to reserve your vehicle in just a few clicks. Save time and start your journey hassle-free!',
    icon: <Selection />,
    iconBg: theme.colors.extraDarkGray,
  },
  {
    title: 'Many Pickup Locations',
    text: 'With a wide range of pickup points, we make it convenient for you to start your journey wherever you are. Enjoy flexibility and ease no matter your location.',
    icon: <Crown />,
    iconBg: theme.colors.coolSurf,
  },
  {
    title: 'Customer Satisfaction',
    text: 'Your happiness is our priority. We are dedicated to providing excellent service and ensuring a smooth rental experience from start to finish.',
    icon: <UserCheck />,
    iconBg: theme.colors.warningOrange,
  },
];

export default whyChooseUsData;
