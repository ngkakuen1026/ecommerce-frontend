import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="border rounded-lg p-4 shadow hover:shadow-md ease-in-out transition delay-75 hover:scale-[1.05]">
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-72 object-cover rounded"
        />
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