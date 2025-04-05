import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Award,
  Settings,
  LogOut
} from 'lucide-react';

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/adminDashboard/app' },
    { icon: Users, label: 'Users', path: '/adminDashboard/users' },
    { icon: BookOpen, label: 'Courses', path: '/adminDashboard/courses' },
    { icon: Award, label: 'Certificates', path: '/adminDashboard/certificates' },
    { icon: Settings, label: 'Settings', path: '/adminDashboard/settings' }
  ];

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    // For example:
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="p-4 flex-1">
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
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-gray-100 transition-colors text-red-600"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;