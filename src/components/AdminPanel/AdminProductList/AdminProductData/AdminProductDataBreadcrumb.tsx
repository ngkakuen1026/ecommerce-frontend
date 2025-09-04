import React from "react";
import type { Product } from "../../../../types/product";
import { Link } from "react-router-dom";

interface AdminUserDataBreadcrumbProps {
  product: Product;
  onBack: () => void;
}

const AdminProductDataBreadcrumb: React.FC<AdminUserDataBreadcrumbProps> = ({
  product,
  onBack,
}) => {
  return (
    <div className="flex justify-between gap-2 mb-8 text-gray-500">
      <p>
        <Link to="/admin-panel/all-products-list" className="hover:opacity-70">
          All Products
        </Link>{" "}
        &gt;{" "}
        <span className="text-black font-semibold">
          {product.title} (Product ID: {product.id})
        </span>{" "}
        &gt; Update Product Details
      </p>
      <button
        onClick={onBack}
        className="text-gray-500 cursor-pointer hover:underline"
      >
        Back
      </button>
    </div>
  );
};

export default AdminProductDataBreadcrumb;
