import { Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gray-50 mt-auto pt-16">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Curve */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg
            className="relative block w-full h-16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#FFFFFF"
              d="M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,128C672,107,768,117,864,144C960,171,1056,213,1152,202.7C1248,192,1344,128,1392,96L1440,64V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
            />
          </svg>
        </div>

        {/* Footer Content */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 z-10 relative">
          {/* Logo Section */}
          <div className="flex flex-col gap-2 self-center">
            <Link to="/" className="text-4xl font-bold text-blue-500">
              Shoporia
            </Link>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
            <ul className="space-y-3">
              {[
                { label: "About", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "FAQ", path: "/faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xl text-gray-800 hover:text-blue-600 hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Browsing Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Browsing</h2>
            <ul className="space-y-3">
              {[
                { label: "All Categories", path: "/categories" },
                { label: "All Products", path: "/" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xl text-gray-800 hover:text-blue-600 hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-8 h-8 hover:opacity-50 transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <span className="text-xl">+852-12345678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-8 h-8 hover:opacity-50 transition ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer" />
                <span className="text-xl">Support@sample.com</span>
              </div>
              <div className="flex gap-4 mt-2">
                <Link to="/">
                  <Facebook className="w-8 h-8 hover:text-gray-400 transition ease-in-out hover:-translate-y-1 hover:scale-110" />
                </Link>
                <Link to="/">
                  <Instagram className="w-8 h-8 hover:text-gray-400 transition ease-in-out hover:-translate-y-1 hover:scale-110" />
                </Link>
                <Link to="/">
                  <Twitter className="w-8 h-8 hover:text-gray-400 transition ease-in-out hover:-translate-y-1 hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="px-4 pt-6 z-10 relative">
          <div className="mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 text-center">
            {[
              { label: "Term of Use", path: "/term-of-use" },
              { label: "Privacy Notice", path: "/privacy-notice" },
              {
                label: "Consumer Health Data Privacy Disclosure",
                path: "/consumer-health",
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-base text-gray-400 hover:text-blue-500 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-2">
            <h1 className="text-gray-500 text-center text-sm">
              © 2025 Shoporia.com, Inc. All rights reserved.
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
