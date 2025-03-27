import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn, Search, ChevronDown, Book, Laptop, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: "Courses",
    href: "/courses",
    icon: Book,
    children: [
      {
        label: "Web Development",
        href: "/courses/web-development",
        description: "Learn modern web technologies and frameworks",
      },
      {
        label: "Digital Marketing",
        href: "/courses/digital-marketing",
        description: "Master SEO, social media, and online advertising",
      },
      {
        label: "Data Science",
        href: "/courses/data-science",
        description: "Analyze data and build predictive models",
      },
      {
        label: "UX/UI Design",
        href: "/courses/ux-ui-design",
        description: "Create beautiful and user-friendly interfaces",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    icon: Laptop,
  },
  {
    label: "Programs",
    href: "/programs",
    icon: Video,
  },
  {
    label: "About",
    href: "/about",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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
        <Link to="/" className="flex items-center gap-2">
          <img width={50} height={50} src='/logo.png'></img>
          <span className="font-display font-bold text-2xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            DigiLearn
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                onClick={() => item.children && handleDropdownToggle(item.label)}
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

        {/* Search & Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="rounded-full bg-gradient-to-r from-brand-purple to-brand-blue">
            <Link to="/signup">Sign Up</Link>
          </Button>
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
              <span>Search courses</span>
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
          <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/login" onClick={toggleMenu}>
                <LogIn className="h-4 w-4 mr-2" />
                Log In
              </Link>
            </Button>
            <Button asChild className="w-full bg-gradient-to-r from-brand-purple to-brand-blue">
              <Link to="/signup" onClick={toggleMenu}>
                Sign Up
              </Link>
            </Button>
          </div>
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
