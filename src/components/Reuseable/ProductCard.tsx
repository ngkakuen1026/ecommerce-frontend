import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { Product } from "../../types/product";
import { Heart, ShoppingBasket, User } from "lucide-react";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const hasImage = product.image_url && product.image_url.trim() !== "";
  const product_createdTime = new Date(product.created_at);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - product_createdTime.getTime()) / (1000 * 60 * 60 * 24)
  );

  const location = useLocation();
  const shouldHideElement = location.pathname.startsWith("/user/");

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition ease-in-out delay-50 hover:scale-[1.01]">
      {/* Uploader Info */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {product.user.profile_image ? (
              <img
                src={product.user.profile_image}
                alt={product.user.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-500" />
            )}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800 leading-none">
              <Link
                to={`/user/${product.user.username}`}
                className="hover:opacity-50"
              >
                {product.user.username}
              </Link>
            </p>
            <p className="text-base text-gray-500 leading-none">
              {diffDays} Days Before
            </p>
          </div>
        </div>

        {!shouldHideElement && (
          <Heart className="text-gray-500 hover:text-red-500 transition cursor-pointer" />
        )}
      </div>

      <Link to={`/product/${product.id}`}>
        <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
          {hasImage ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-lg">No image provided</span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <Link to={`/product/${product.id}`}>
        <h2 className="mt-2 text-lg font-semibold hover:underline">
          {product.title}
        </h2>
      </Link>
      <p className="text-gray-600">${product.price}</p>
      {!shouldHideElement && (
        <button className="flex items-center gap-2 mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          Add to Cart
          <ShoppingBasket size={16} />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
