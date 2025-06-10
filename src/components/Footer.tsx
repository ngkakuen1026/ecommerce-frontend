import { Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
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
              <li>
                <Link
                  key={item.label}
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
              { label: "All Categories", path: "/" },
              { label: "All Products", path: "/" },
            ].map((item) => (
              <li>
                <Link
                  key={item.label}
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

      <div className="px-4 pt-6">
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
    </footer>
  );
};

export default Footer;
