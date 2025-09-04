import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Box, DollarSign, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { UserType } from "../../../../types/user";
import type { Product } from "../../../../types/product";
import type { OrderList } from "../../../../types/order";
import type { WishlistItem } from "../../../../types/wishlist";

interface UserProductInfoProps {
  user: UserType;
  userProducts: Product[];
  userOrders: OrderList[];
  userWishlist: WishlistItem[];
}

const PRODUCTS_PER_PAGE = 15;

const UserProductInfo: React.FC<UserProductInfoProps> = ({
  user,
  userProducts,
  userOrders,
  userWishlist,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(userProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = userProducts.slice(startIdx, endIdx);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="w-1/3 bg-gray-50 p-6 rounded-sm shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">
        {user.username}'s Activity Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="px-6 py-3 rounded-lg flex flex-row gap-6 items-center border border-blue-400 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <Box size={36} className="text-blue-500" />
          <div>
            <p className="text-lg">Listed Products</p>
            <p className="text-lg">{userProducts.length}</p>
          </div>
        </div>
        <div className="px-6 py-3 rounded-lg flex flex-row gap-6 items-center border border-blue-400 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <DollarSign size={36} className="text-blue-500" />
          <div>
            <p className="text-lg">Total Orders</p>
            <p className="text-lg">{userOrders.length}</p>
          </div>
        </div>
        <div className="px-6 py-3 rounded-lg flex flex-row gap-6 items-center border border-blue-400 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <Heart size={36} className="text-blue-500" />
          <div>
            <p className="text-lg">Wishlist Items</p>
            <p className="text-lg">{userWishlist.length}</p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-4 mb-2">
        {user.username}'s Products
      </h2>
      <table>
        <thead>
          <tr>
            <th className="py-2 pr-4">Product ID</th>
            <th className="py-2 pr-4">Product Name</th>
            <th className="py-2 pr-4">Product Price</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">
                  <Link
                    to={`/product/${product.id}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="py-2 px-4">${product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">
                No products listed by this user.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className={`px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={16} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProductInfo;
