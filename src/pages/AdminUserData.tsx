import { useEffect, useState } from "react";
import type { UserType } from "../types/user";
import authAxios from "../services/authAxios";
import { orderAPI, productAPI, userAPI, wishlistAPI } from "../services/http-api";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Reuseable/Spinner";
import type { Product } from "../types/product";
import type { OrderList } from "../types/order";
import type { WishlistItem } from "../types/wishlist";
import AdminUserDataBreadcrumb from "../components/AdminPanel/AdminUserList/AdminUserData/AdminUserDataBreadcrumb";
import UserInfo from "../components/AdminPanel/AdminUserList/AdminUserData/AdminUserInfo";
import UserProductInfo from "../components/AdminPanel/AdminUserList/AdminUserData/AdminUserProductInfo";

const AdminUserData = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserType | null>(null);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [userOrders, setUserOrders] = useState<OrderList[]>([]);
  const [userWishlist, setUserWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await authAxios.get(
        `${userAPI.url}/admin/all-users/user/${id}`
      );
      console.log("[Admin] User data fetched successfully", response.data);
      setUser(response.data.user);
    } catch (error) {
      console.error("[Admin] Error fetching user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchUserProduct = async () => {
      if (!user) return;
      try {
        const response = await authAxios.get(
          `${productAPI.url}/${user.username}/products`
        );
        console.log(
          "[Admin] User's product data fetched successfully",
          response.data
        );
        setUserProducts(response.data.products);
      } catch (error) {
        console.error("[Admin] Error fetching user product data", error);
      }
    };

    fetchUserProduct();
  }, [user]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user) return;
      try {
        const response = await authAxios.get(
          `${orderAPI.url}/admin/${user.id}/orders`
        );
        console.log(
          "[Admin] User's order data fetched successfully",
          response.data
        );
        setUserOrders(response.data.orders);
      } catch (error) {
        console.error("[Admin] Error fetching user order data", error);
      }
    };

    fetchOrder();
  }, [user]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;
      try {
        const response = await authAxios.get(
          `${wishlistAPI.url}/admin/${user.id}/wishlist`
        );
        console.log(
          "[Admin] User's wishlist data fetched successfully!!!",
          response.data
        );
        setUserWishlist(response.data.wishlist);
      } catch (error) {
        console.error("[Admin] Error fetching user wishlist data", error);
      }
    };

    fetchWishlist();
  }, [user]);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      {isLoading ? (
        <Spinner />
      ) : user ? (
        <div>
          <h1 className="text-4xl font-semibold mb-4">
            User Details for {user.username}
          </h1>

          <AdminUserDataBreadcrumb user={user} onBack={onBack} />

          <div className="flex flex-row gap-6">
            <UserInfo user={user} onUserUpdated={fetchUserData} />
            <UserProductInfo
              user={user}
              userProducts={userProducts}
              userOrders={userOrders}
              userWishlist={userWishlist}
            />
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default AdminUserData;
