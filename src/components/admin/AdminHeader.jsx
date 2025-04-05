import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ onToggleSidebar }) => {
  const user = {
    firstName: 'Admin',
    lastName: 'User'
  };

  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Mobile menu button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <span className="hidden md:inline font-bold">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;