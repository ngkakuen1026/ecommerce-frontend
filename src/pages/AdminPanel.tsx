import AdminPanelNavbar from "../components/AdminPanel/AdminPanelNavbar";
import { Outlet, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import AdminPanelOverview from "./AdminPanelOverview";
import UserData from "./UserData";
import OrderList from "./OrderList";

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
        <Route path="all-users-list" element={<UserList />} />
        <Route path="all-user-list/user/:id" element={<UserData />} />
        <Route path="all-orders-list" element={<OrderList />} />
      </Route>
    </Routes>
  );
};

export default AdminPanelRoutes;
