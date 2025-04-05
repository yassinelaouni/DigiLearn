import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img width={165} src='/logo.png' alt="DigiLearn Logo" />
            </Link>
            <p className="text-muted-foreground">
              Your gateway to digital literacy. We empower university students with the knowledge and skills needed for the digital age.
            </p>
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
                <Link to="/certificates" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground underline-anim inline-block pb-1">
                  About Us
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