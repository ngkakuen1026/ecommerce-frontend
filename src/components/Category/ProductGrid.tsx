import React from "react";
import type { Product } from "../../types/product";
import ProductCard from "../Reuseable/ProductCard";
import { X } from "lucide-react";
import type { WishlistItem } from "../../types/wishlist";
import type { Categories } from "../../types/category";

interface Props {
  products: Product[];
  loading: boolean;
  wishlist: WishlistItem[];
    categories: Categories[]; 
}

const ProductGrid: React.FC<Props> = ({ products, loading, wishlist, categories }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
        <X className="w-8 h-8 mb-2" />
        <h2 className="text-lg font-medium">No products found</h2>
        <p className="text-sm mt-1 text-gray-400">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 drop-shadow-lg">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} wishlist={wishlist} categories={categories}/>
      ))}
    </div>
  );
};

export default ProductGrid;
