import React from "react";
import Spinner from "../../Reuseable/Spinner";
import { Link } from "react-router-dom";
import type { Product } from "../../../types/product";

interface AdminProductListTableProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  getCategoryName: (catId: number) => string;
  deleteProduct: (productId: number) => void;
  isLoading: boolean;
}

const AdminProductListTable = ({
  products,
  setProducts,
  getCategoryName,
  deleteProduct,
  isLoading,
}: AdminProductListTableProps) => {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100 text-left border-b">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Product Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Listed at</th>
              <th className="py-3 px-4">Delete?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-3 px-4">{product.id}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`product/${product.id}`}
                    className="hover:underline hover:opacity-70"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4">
                  {getCategoryName(product.category_id)}
                </td>
                <td className="py-3 px-4">
                  {product.created_at
                    ? new Date(product.created_at).toLocaleString("en")
                    : "Unknown"}
                </td>

                <td className="py-3 px-4">
                  <button
                    className="text-red-500 hover:underline ml-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        deleteProduct(product.id);
                        setProducts((prev) =>
                          prev.filter((p: Product) => p.id !== product.id)
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AdminProductListTable;
