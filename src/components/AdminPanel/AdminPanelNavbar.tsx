import {
  Box,
  DollarSign,
  Home,
  ShoppingBag,
  SquareStack,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminPanelNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-5 flex flex-col justify-between">
      <div>
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
              to="all-products-list"
              className="flex items-center gap-2 cursor-pointer hover:underline"
            >
              <Box size={24} />
              All Products
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
              to="all-categories"
              className="flex items-center gap-2 cursor-pointer hover:underline"
            >
              <SquareStack size={24} />
              Categories
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="all-promo-codes"
              className="flex items-center gap-2 cursor-pointer hover:underline"
            >
              <DollarSign size={24} />
              Promotion Codes
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer hover:underline"
        >
          <Home size={24} />
          Back to Home Page
        </Link>
      </div>
    </nav>
  );
};

export default AdminPanelNavbar;
