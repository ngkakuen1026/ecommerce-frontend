import { Box, ScanBarcode, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8 text-center">Dashboard</h1>
      <ul>
        <li className="mb-4">
          <Link
            to="/dashboard/overview"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <Box size={24} />
            Overview
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/products"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <ScanBarcode size={24} />
            Products
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/orders"
            className="flex items-center gap-2 cursor-pointer hover:underline"
          >
            <ShoppingBag size={24} />
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNavbar;
