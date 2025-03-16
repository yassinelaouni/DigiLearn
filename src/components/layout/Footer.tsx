
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center">
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-yellow rounded-full"></div>
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="font-display font-bold text-2xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                DigiLearn
              </span>
            </Link>
            <p className="text-muted-foreground">
              Your gateway to digital literacy. We empower university students with the knowledge and skills needed for the digital age.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-muted-foreground hover:text-brand-purple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-pink transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-orange transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Our Instructors
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Blog & Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Course Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses/web-development" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses/digital-marketing" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="/courses/data-science" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/courses/ux-ui-design" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link to="/courses/blockchain" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Blockchain
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest courses, resources, and digital trends.
            </p>
            <div className="flex items-center gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button size="sm" className="bg-brand-purple hover:bg-brand-purple/90">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DigiLearn. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground underline-anim inline-block pb-1">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground underline-anim inline-block pb-1">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-foreground underline-anim inline-block pb-1">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
