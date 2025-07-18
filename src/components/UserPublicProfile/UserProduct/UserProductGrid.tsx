import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "../../../types/product";
import ProductCard from "../../Reuseable/ProductCard";

interface Props {
  products: Product[];
  currentPage: number;
  totalPages: number;
  productsPerPage: number;
  setCurrentPage: (page: number) => void;
  username: string;
}

const UserProductGrid: React.FC<Props> = ({
  products,
  currentPage,
  totalPages,
  productsPerPage,
  setCurrentPage,
  username,
}) => {
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-700">
          Products listing for {username}
        </h2>

        {products.length > productsPerPage && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border text-sm disabled:opacity-50 hover:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border text-sm disabled:opacity-50 hover:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProductGrid;