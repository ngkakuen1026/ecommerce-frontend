import { useState } from "react";
import {
  Bell,
  TableOfContents,
  User,
  X,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-50 shadow-md px-6 py-4">
      <div className="mx-auto flex items-center justify-between gap-10">
        {/* Logo */}
        <div className="flex-none">
          <Link to="/" className="text-3xl font-bold text-blue-500">
            Shoporia
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex flex-1 gap-10">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "FAQ", path: "/faq" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-xl text-gray-800 hover:text-blue-600 hover:opacity-70 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="hidden lg:flex flex-none gap-4">
          <div className="inline-block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-xl hover:opacity-50 cursor-pointer">
            <Bell />
          </div>
          <div className="inline-block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-xl hover:opacity-50 cursor-pointer">
            <Heart />
          </div>
          <div className="inline-block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-xl hover:opacity-50 cursor-pointer">
            <ShoppingCart />
          </div>
          <Link
            to="/login"
            className="inline-block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 font-medium text-xl hover:opacity-50"
          >
            <User />
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="text-gray-700 hover:text-blue-600"
          >
            <Bell className="w-6 h-6" />
          </button>
          <button
            aria-label="Shopping Cart"
            className="text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="text-gray-700 hover:text-blue-600"
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <TableOfContents className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 space-y-2 px-4">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "FAQ", path: "/faq" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className=" block text-xl text-gray-800 hover:text-blue-600 hover:opacity-70 transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t pt-4 mt-4 space-y-2">
            <button className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium text-xl">
              <Link to="/login">Login</Link>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
