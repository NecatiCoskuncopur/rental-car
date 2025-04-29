import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

import theme from '@/theme';

const socialMediaData = [
  { href: 'https://www.facebook.com/', icon: <FaFacebookF />, background: theme.colors.darkBlue },
  { href: 'https://x.com/', icon: <FaXTwitter />, background: theme.colors.lightBlue },
  { href: 'https://www.instagram.com/', icon: <FaInstagram />, background: theme.colors.errorRed },
  { href: 'https://www.linkedin.com/', icon: <FaLinkedinIn />, background: theme.colors.blue },
];

export default socialMediaData;
