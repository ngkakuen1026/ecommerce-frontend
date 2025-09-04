import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  CirclePlus,
  ChartBarIncreasing,
  UserPen,
} from "lucide-react";
import type { RefObject } from "react";
import type { UserType } from "../../types/user";

interface UserMenuProps {
  isLoggedIn: boolean;
  showMenu: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  user: UserType | null;
  logout: () => void;
  toggleMenu: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  isLoggedIn,
  menuRef,
  user,
  logout,
  toggleMenu,
  showMenu,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center">
      {isLoggedIn ? (
        <div className="relative flex items-center" ref={menuRef}>
          <button
            onClick={toggleMenu} 
            className="flex items-center justify-center focus:outline-none"
          >
            <img
              src={
                user?.profile_image
                  ? user.profile_image
                  : "https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-blue-500 object-cover md:hover:opacity-50"
            />
          </button>

          {showMenu && ( 
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 space-y-2">
              <div className="flex gap-4 mb-2">
                {user?.profile_image ? (
                  <img
                    src={user?.profile_image ?? "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-14 h-14 rounded-full border object-cover md:hover:opacity-50"
                  />
                ) : (
                  <img
                    src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-gray-700 font-medium text-base">
                    {user?.first_name}, {user?.last_name}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">
                Welcome back,{" "}
                <span className="font-semibold text-gray-800 hover:opacity-50">
                  <Link to={`/user/${user?.username}`}>{user?.username}</Link>
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
                    onClick={toggleMenu}
                    className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-100 transition flex items-center"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-2 space-y-1">
                <Link
                  to="/dashboard/overview"
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                >
                  <ChartBarIncreasing className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/add-product"
                  onClick={toggleMenu} 
                  className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                >
                  <CirclePlus className="w-4 h-4" />
                  <span>Add Product</span>
                </Link>
                <Link
                  to="/user/myprofile"
                  onClick={toggleMenu} 
                  className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                >
                  <UserPen className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Link>
                {user?.is_admin === true && (
                  <Link
                    to="/admin-panel/overview"
                    onClick={toggleMenu} 
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
  );
};

export default UserMenu;