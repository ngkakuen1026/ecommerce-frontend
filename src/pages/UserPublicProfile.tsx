import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { productAPI } from "../services/http-api";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

const UserPublicProfile = () => {
  const { username } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<{
    username: string;
    profile_image?: string;
    registration_date?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    axios
      .get(`${productAPI.url}/${username}/products`)
      .then((res) => {
        const productList: Product[] = res.data.products;
        setProducts(productList);
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
<div className="w-full max-w-7xl mx-auto p-4 sm:px-6 text-black">
      {/* Header */}
      <div className="bg-cyan-500 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        <img
          src={user.profile_image || "/default-avatar.png"}
          alt={user.username}
          className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-sm text-white mt-1">
            Joined{" "}
            {user.registration_date
              ? new Date(user.registration_date).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300 mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
        <button className="pb-2 border-b-2 border-blue-500 text-blue-500 font-medium">
          Products
        </button>
        <button className="pb-2 text-gray-500 hover:text-blue-600">
          User Comments
        </button>
      </div>

      {/* Product Grid */}
      <div className="mt-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700">
          Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPublicProfile;