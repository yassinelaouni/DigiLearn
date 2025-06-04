import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, Search, ChevronDown, Book, Laptop, Video, LogOut, User, Settings, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import selectAuthUser from "@/features/auth/selectors/user";
import Cookies from 'js-cookie';

const STORAGE_KEYS = {
  PROFILE: 'userProfile',
  AVATAR: 'userAvatar'
};

const navItems = [
  {
    label: "Cours",
    href: "/courses",
    icon: Book,
  },
  {
    label: "Certificats",
    href: "/certificates",
    icon: Award,
  },
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: User,
  },
  {
    label: "À propos",
    href: "/about",
  },

];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectAuthUser);


  // Initialize profile state
  const getInitialState = () => {
    try {
      const localStorageProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (localStorageProfile) return JSON.parse(localStorageProfile);

      const cookieProfile = Cookies.get(STORAGE_KEYS.PROFILE);
      if (cookieProfile) return JSON.parse(cookieProfile);

      return {
        id: currentUser?.id || '',
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '',
        avatar: currentUser?.avatar || null
      };
    } catch (error) {
      console.error('Error loading profile data:', error);
      return {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        avatar: null,
      };
    }
  };

  const [profile, setProfile] = useState(getInitialState());

  // Persist profile to storage
  useEffect(() => {
    if (!profile.id) return;

    try {
      const profileData = JSON.stringify(profile);
      localStorage.setItem(STORAGE_KEYS.PROFILE, profileData);
      Cookies.set(STORAGE_KEYS.PROFILE, profileData, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      if (profile.avatar) {
        localStorage.setItem(STORAGE_KEYS.AVATAR, profile.avatar);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  }, [profile]);

  // Sync with Redux changes
  useEffect(() => {
    if (currentUser?.id) {
      setProfile(prev => ({
        id: currentUser.id,
        firstName: currentUser.firstName || prev.firstName,
        lastName: currentUser.lastName || prev.lastName,
        email: currentUser.email || prev.email || '',
        avatar: "http://localhost:5000/uploads/avatars/avatar-1748561725844-615826196.png?t=1748561873106"
      }));
    }
  }, [currentUser]);

  // Get user initials
  const getInitials = () => {
    return `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase();
  };

  // Clean storage on logout
  const cleanupStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.AVATAR);
    Cookies.remove(STORAGE_KEYS.PROFILE);
  };

  // Handle logout
  const handleLogout = () => {
    cleanupStorage();
    // dispatch(logoutAction()); // Uncomment if you have logout action
    setOpenDropdown(null);
    setIsMenuOpen(false);
    window.location.reload(); // Temporary solution until proper auth flow
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdownToggle = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"} className="flex items-center justify-center gap-2">
          <img width={165} src='/logo.png' alt="DigiLearn Logo" />

        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => item.children ? handleDropdownToggle(item.label) : navigate(item.href)}
                className={cn(
                  "px-4 py-2 rounded-full font-medium flex items-center gap-1 hover:bg-black/5 transition-colors",
                  openDropdown === item.label ? "text-brand-purple" : ""
                )}
              >
                {item.label}

                {item.children && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openDropdown === item.label ? "rotate-180" : ""
                    )}
                  />
                )}
              </button>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden z-50 animate-fade-in">
                  <div className="p-4 grid gap-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block p-3 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="font-medium">{child.label}</div>
                        {child.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {child.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Controls */}
        <div className="hidden md:flex items-center gap-3">
          {profile.id ? (
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('profile')}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                {true ? (
                  <img
                    src={"http://localhost:5000/uploads/avatars/avatar-1748561725844-615826196.png?t=1748561873106"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-white font-medium">
                    {getInitials()}
                  </div>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    openDropdown === 'profile' ? "rotate-180" : ""
                  )}
                />
              </button>

              {openDropdown === 'profile' && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden z-50 animate-fade-in">
                  <div className="p-3 border-b">
                    <div className="font-medium truncate">{profile.firstName} {profile.lastName}</div>                  </div>
                  <div className="p-1">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors rounded-lg"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <User className="h-4 w-4" />
                      Profil
                    </Link>
                  </div>
                  <div className="p-1 border-t">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors rounded-lg text-red-500"
                    >
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/login">Connexion</Link>
              </Button>
              <Button asChild className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue">
                <Link to="/signup">S'inscrire</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full hover:bg-black/5"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-[68px] bg-white z-40 transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container py-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b pb-4">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Search className="h-4 w-4" />
              <span>Rechercher des cours</span>
            </Button>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.label} className="border-b pb-2">
                <Link
                  to={item.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                  onClick={toggleMenu}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon className="h-5 w-5 text-brand-purple" />}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.children && (
                  <div className="pl-12 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block p-2 text-sm rounded hover:bg-muted transition-colors"
                        onClick={toggleMenu}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile auth section */}
          {profile.id ? (
            <div className="mt-auto space-y-3 pt-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-white font-medium">
                    {getInitials()}
                  </div>
                )}
                <div>
                  <div className="font-medium truncate">
                    {profile.firstName} {profile.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {profile.email}
                  </div>
                </div>
              </div>
              <Link
                to="/profile"
                className="block p-3 text-center rounded-lg border hover:bg-muted transition-colors"
                onClick={toggleMenu}
              >
                Mon Profil
              </Link>
              <Link
                to="/settings"
                className="block p-3 text-center rounded-lg border hover:bg-muted transition-colors"
                onClick={toggleMenu}
              >
                Paramètres
              </Link>
              <button
                onClick={handleLogout}
                className="w-full p-3 text-center rounded-lg border hover:bg-muted transition-colors flex items-center justify-center gap-2 text-red-500"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={toggleMenu}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Connexion
                </Link>
              </Button>
              <Button asChild className="w-full bg-gradient-to-r from-brand-purple to-brand-blue">
                <Link to="/signup" onClick={toggleMenu}>
                  S'inscrire
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
};

export default Header;