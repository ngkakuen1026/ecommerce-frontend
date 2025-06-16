import { useEffect, useState, useRef } from "react";
import {
  Bell,
  User,
  ShoppingCart,
  Heart,
  LogOut,
  UserPen,
  ChartBarIncreasing,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-50 shadow-md px-6 py-4">
      <div className="mx-auto flex items-center justify-between gap-10">
        {/* Logo */}
        <div className="flex-none">
          <Link to="/" className="text-3xl font-bold text-blue-500">
            Shoporia
          </Link>
        </div>

        {/* Left-side nav */}
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

        {/* Right-side Icons */}
        <div className="flex items-center gap-6">
          <Link
            to="/notification"
            className="flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <Bell className="w-8 h-8" />
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <Heart className="w-8 h-8" />
          </Link>
          <Link
            to="/cart"
            className="flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <ShoppingCart className="w-8 h-8" />
          </Link>

          {/* Avatar Dropdown */}
          {isLoggedIn ? (
            <div className="relative flex items-center" ref={menuRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex items-center justify-center focus:outline-none"
              >
                <img
                  src={user?.profile_image}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border object-cover md:hover:opacity-50"
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 space-y-2">
                  <div className="flex gap-4 mb-2">
                    <img
                      src={user?.profile_image ?? "/default-avatar.png"}
                      alt="User Avatar"
                      className="w-14 h-14 rounded-full border object-cover md:hover:opacity-50"
                    />
                    <div>
                      <p className="text-gray-700 font-medium text-base">
                        {user?.first_name}, {user?.last_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Welcome back,{" "}
                    <span className="font-semibold text-gray-800 hover:opacity-50">
                      <Link to={`/user/${user?.username}`}>
                        {user?.username}
                      </Link>
                    </span>
                  </p>
                  {/* Mobile-only nav links */}
                  <div className="flex flex-col lg:hidden border-t pt-2 space-y-1">
                    {[
                      { label: "Home", path: "/" },
                      { label: "About", path: "/about" },
                      { label: "Contact", path: "/contact" },
                      { label: "FAQ", path: "/faq" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setShowMenu(false)}
                        className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-100 transition flex items-center"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-2 space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                    >
                      <ChartBarIncreasing className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      to="/user/myprofile"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                    >
                      <UserPen className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </Link>
                    {user?.is_admin === true && (
                      <Link
                        to="/admin"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                      >
                        <UserPen className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t pt-2 space-y-1">
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="flex items-center gap-2 w-full px-2 py-2 text-red-600 hover:bg-gray-100 rounded transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center focus:outline-none"
            >
              <User className="w-8 h-8 text-gray-700 hover:text-blue-600" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
