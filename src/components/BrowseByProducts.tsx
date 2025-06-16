import axios from "axios";
import { useEffect, useState } from "react";
import { productAPI } from "../services/http-api";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const BrowseByProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${productAPI.url}`)
      .then((res) => {
        const fetchedProducts = res.data.products;
        setProducts(fetchedProducts.slice(0, 12));
      })
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return (
    <div className="p-10 bg-white">
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-4xl font-bold">Product On Sale</h1>
        <Link
          to="/categories"
          className="text-lg text-gray-600 hover:opacity-50 whitespace-nowrap"
        >
          View all categories...
        </Link>
      </div>

      <div className="grid max-w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-lg">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BrowseByProducts;
