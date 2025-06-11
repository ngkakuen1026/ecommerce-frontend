import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const hasImage = product.image_url && product.image_url.trim() !== "";

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="border rounded-lg p-4 shadow hover:shadow-md ease-in-out transition delay-75 hover:scale-[1.05]">
        <div className="w-full h-72 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
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
        <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;