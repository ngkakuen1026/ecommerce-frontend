import AdminPanelNavbar from "../components/AdminPanel/AdminPanelNavbar";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminPanelOverview from "./AdminPanelOverview";
import AdminProductList from "./AdminProductList";
import AdminCategoryList from "./AdminCategoryList";
import AdminOrderList from "./AdminOrderList";
import AdminPromocodeList from "./AdminPromocodeList";
import AdminUserList from "./AdminUserList";
import AdminUserData from "./AdminUserData";
import AdminProductData from "./AdminProductData";
import AdminCategoryData from "./AdminCategoryData";
import AdminAddCategory from "./AdminAddCategory";
import AdminPromocodeData from "./AdminPromocodeData";
import AdminAddPromocode from "./AdminAddPromocode";

const AdminPanel = () => {
  return (
    <div className=" w-full ">
      <div className="flex">
        <AdminPanelNavbar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AdminPanelRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPanel />}>
        <Route path="overview" element={<AdminPanelOverview />} />
        <Route path="all-products-list" element={<AdminProductList />} />
        <Route path="all-products-list/product/:id" element={<AdminProductData />} />
        <Route path="all-users-list" element={<AdminUserList />} />
        <Route path="all-users-list/user/:id" element={<AdminUserData />} />
        <Route path="all-orders-list" element={<AdminOrderList />} />
        <Route path="all-categories" element={<AdminCategoryList />} />
        <Route path="all-categories/add-category" element={<AdminAddCategory/>} />
        <Route path="all-categories/category/:id" element={<AdminCategoryData />} />
        <Route path="all-promo-codes" element={<AdminPromocodeList />} />
        <Route path="all-promo-codes/add-promo-code" element={<AdminAddPromocode/>} />
        <Route path="all-promo-codes/promotion/:id" element={<AdminPromocodeData/>} />
      </Route>
    </Routes>
  );
};

export default AdminPanelRoutes;
