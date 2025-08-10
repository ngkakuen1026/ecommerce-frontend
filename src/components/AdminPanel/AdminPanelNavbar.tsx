import { Box, Home, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPanelNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
      <ul>
        <li className="mb-4">
          <Link
            to="overview"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <Box size={24} />
            Overview
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="all-users-list"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <User size={24} />
            All Users
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="all-orders-list"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <ShoppingBag size={24} />
            All Orders
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <Home size={24} />
            Back to Home Page
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminPanelNavbar;
