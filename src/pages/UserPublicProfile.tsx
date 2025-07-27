import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { productAPI } from "../services/http-api";
import type { Product } from "../types/product";
import UserProductGrid from "../components/UserPublicProfile/UserProduct/UserProductGrid";
import UserComments from "../components/UserPublicProfile/UserComment/UserComments";
import UserHeader from "../components/UserPublicProfile/UserHeader";
import UserTabs from "../components/UserPublicProfile/UserTabs";
import authAxios from "../services/authAxios";

const UserPublicProfile = () => {
  const { username } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<{
    user_id: number;
    username: string;
    profile_image?: string;
    registration_date?: string;
    bio?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "comments">(
    "products"
  );

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    if (!username) return;

    authAxios
      .get(`${productAPI.url}/${username}/products`)
      .then((res) => {
        setProducts(res.data.products);
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user products:", err);
        setLoading(false);
      });

      
  }, [username]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <div className="p-10 text-center">User not found</div>;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 sm:px-6 text-black">
      <UserHeader
        username={user.username}
        profileImage={
          user.profile_image
            ? user.profile_image
            : "https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
        }
        registrationDate={user.registration_date}
        bio={user.bio}
      />

      <UserTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === "products" ? (
        <UserProductGrid
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          productsPerPage={productsPerPage}
          setCurrentPage={setCurrentPage}
          username={user.username}
        />
      ) : (
        <UserComments userId={user.user_id} />
      )}
    </div>
  );
};

export default UserPublicProfile;
