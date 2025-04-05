import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Award,
  Settings
} from 'lucide-react';

export const AdminSidebar = () => {
  const location = useLocation();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/adminDashboard/app' },
    { icon: Users, label: 'Users', path: '/adminDashboard/users' },
    { icon: BookOpen, label: 'Courses', path: '/adminDashboard/courses' },
    { icon: Award, label: 'Certificates', path: '/adminDashboard/certificates' },
    { icon: Settings, label: 'Settings', path: '/adminDashboard/settings' }
  ];

  return (
    <div className="w-64 bg-white border-r h-full">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  location.pathname.startsWith(item.path) 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default AdminSidebar;