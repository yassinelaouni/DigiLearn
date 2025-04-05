import { Outlet } from 'react-router-dom';
import  AdminSidebar  from '@/components/admin/AdminSidebar';
import  AdminHeader  from '@/components/admin/AdminHeader';

export const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;