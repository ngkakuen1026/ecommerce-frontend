import { ArrowUp, ArrowDown, Trash } from "lucide-react";
import { Link } from "react-router-dom";

import type { Product } from "../../../types/product";
import type { Categories } from "../../../types/category";

type ProductTableProps = {
  products: Product[];
  categories: Categories[];
  getCategoryName: (catId: number) => string;
  handleDelete: (productId: number) => void;
  productIdSort: "asc" | "desc" | "";
  setProductIdSort: (sort: "asc" | "desc" | "") => void;
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  getCategoryName,
  handleDelete,
  productIdSort,
  setProductIdSort,
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border rounded shadow">
      <thead>
        <tr className="bg-gray-100 text-left border-b">
          <th className="py-3 px-4">
            <div className="flex items-center">
              Product ID{" "}
              <button
                type="button"
                onClick={() =>
                  setProductIdSort(productIdSort === "asc" ? "desc" : "asc")
                }
                className="inline-block ml-1 text-gray-500"
                title={`Sort by Product ID ${
                  productIdSort === "asc" ? "descending" : "ascending"
                }`}
              >
                {productIdSort === "asc" ? (
                  <ArrowUp size={16} />
                ) : (
                  <ArrowDown size={16} />
                )}
              </button>
            </div>
          </th>
          <th className="py-3 px-4">Image</th>
          <th className="py-3 px-4">Product Name</th>
          <th className="py-3 px-4">Price (USD)</th>
          <th className="py-3 px-4">Quantity</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4">Category</th>
          <th className="py-3 px-4">Delete Product?</th>
          <th className="py-3 px-4">Public Link</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50 text-left border-b">
            <td className="py-2 px-4">{product.id}</td>
            <td className="py-2 px-4 flex">
              <Link
                to={`/dashboard/products/product-edit/image/${product.id}`}
                className="hover:opacity-15"
              >
                <img
                  src={
                    product.image_url
                      ? product.image_url
                      : "https://static.audison.com/media/2022/10/no-product-image.png"
                  }
                  alt={product.title}
                  className="w-48 h-48 object-cover rounded"
                />
              </Link>
            </td>
            <td className="py-2 px-4">
              <Link
                to={`/dashboard/products/product-edit/${product.id}`}
                className="font-bold hover:underline hover:opacity-50"
              >
                {product.title}
              </Link>
            </td>
            <td className="py-2 px-4">${product.price}</td>
            <td className="py-2 px-4">{product.quantity}</td>
            <td className="py-2 px-4">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  product.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {product.status}
              </span>
            </td>
            <td className="py-2 px-4 border-b">
              {getCategoryName(product.category_id)}
            </td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center justify-center gap-2"
              >
                <Trash size={20} />
                Delete
              </button>
            </td>
            <td className="py-2 px-4">
              <Link
                to={`/product/${product.id}`}
                className="text-gray-500 hover:underline"
              >
                Click Here
              </Link>
            </td>
          </tr>
        ))}
        {products.length === 0 && (
          <tr>
            <td colSpan={9} className="text-center py-6 text-gray-500">
              No products found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
