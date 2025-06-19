import { FaEnvelope, FaFacebookF, FaLinkedinIn, FaPinterestP, FaReddit, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

import theme from '@/theme';

const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';

const shareData = [
  {
    key: 1,
    icon: <FaWhatsapp />,
    name: 'Whatsapp',
    bg: theme.colors.green,
    href: `https://wa.me/?text=${encodeURIComponent('Check this out! ' + currentUrl)}`,
  },
  {
    key: 2,
    icon: <FaFacebookF />,
    name: 'Facebook',
    bg: theme.colors.facebookBlue,
    href: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
  },

  {
    key: 3,
    icon: <FaXTwitter />,
    name: 'Twitter',
    bg: theme.colors.black,
    href: `https://twitter.com/intent/tweet?url=${currentUrl}&text=Check this out!`,
  },
  {
    key: 4,
    icon: <FaEnvelope />,
    name: 'E-Mail',
    bg: theme.colors.gray,
    href: `mailto:?subject=Check this out!&body=${currentUrl}`,
  },
  {
    key: 5,
    icon: <FaReddit />,
    name: 'Reddit',
    bg: theme.colors.redditOrange,
    href: `https://www.reddit.com/submit?url=${currentUrl}&title=Check this out!`,
  },
  {
    key: 6,
    icon: <FaPinterestP />,
    name: 'Pinterest',
    bg: theme.colors.instagramRed,
    href: `https://pinterest.com/pin/create/button/?url=${currentUrl}`,
  },
  {
    key: 4,
    icon: <FaLinkedinIn />,
    name: 'Linkedin',
    bg: theme.colors.linkedinBlue,
    href: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`,
  },
];

export default shareData;
