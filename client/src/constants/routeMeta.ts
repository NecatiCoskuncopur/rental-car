const routeMeta: IRouteMeta = {
  '/about': { title: 'About Us', breadcrumb: ['Home', 'About Us'] },
  '/blog': { title: 'Blog', breadcrumb: ['Home', 'Blog'] },
  '/blog/[slug]': { title: 'Blog Detail', breadcrumb: ['Home', 'Blog', 'Blog Detail'] },
  '/checkout/[id]': { title: 'Checkout', breadcrumb: ['Home', 'Checkout'] },
  '/contact': { title: 'Contact Us', breadcrumb: ['Home', 'Contact Us'] },
  '/privacyPolicy': { title: 'Privacy Policy', breadcrumb: ['Home', 'Privacy Policy'] },
  '/settings': { title: 'Profile', breadcrumb: ['Home', 'Profile'] },
  '/settings/notifications': { title: 'Notifications', breadcrumb: ['Home', 'Notifications'] },
  '/settings/preferences': { title: 'Preferences', breadcrumb: ['Home', 'Preferences'] },
  '/settings/security': { title: 'Security', breadcrumb: ['Home', 'Security'] },
  '/terms': { title: 'Terms & Conditions', breadcrumb: ['Home', 'Terms & Conditions'] },
  '/userBookings': { title: 'My Bookings', breadcrumb: ['Home', 'My Bookings'] },
  '/userDashboard': { title: 'User Dashboard', breadcrumb: ['Home', 'User Dashboard'] },
};

export default routeMeta;
