import React from 'react';

import { AdminDashboardMain, AdminLayout } from '@/components';

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <AdminDashboardMain />
    </AdminLayout>
  );
};

export default AdminDashboard;
