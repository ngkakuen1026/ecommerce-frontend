import { Routes, Route, Outlet } from "react-router-dom";
import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
import DashboardProduct from "./DashboardProduct";
import DashboardOrders from "./DashboardOrders";
import DashboardOverview from "./DashboardOverview";
import EditProduct from "./EditProduct";
import EditProductImage from "./EditProductImage";

const Dashboard = () => {
  return (
    <div className=" w-full ">
      <div className="flex">
        <DashboardNavbar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="products" element={<DashboardProduct />} />
        <Route path="/products/product-edit/:id" element={<EditProduct />} />
        <Route path="/products/product-edit/image/:id" element={<EditProductImage />} />
        <Route path="orders" element={<DashboardOrders />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
