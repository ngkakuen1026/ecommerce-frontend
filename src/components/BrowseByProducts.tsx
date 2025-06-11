import axios from "axios";
import { useEffect, useState } from "react";
import { prodcutAPI } from "../services/http-api";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const BrowseByProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${prodcutAPI.url}`)
      .then((res) => {
        // console.log("API response for Product Data:", res.data);
        const fetchedProducts = res.data.products;
        setProducts(fetchedProducts.slice(0, 12));
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="p-10 bg-white">
      <h1 className="pb-2 text-4xl font-bold">Product On Sale</h1>
      <Link to="/categories">
        <h2 className="pb-5 text-lg text-gray-600 hover:opacity-50">View more products...</h2>
      </Link>
      <div className="grid max-w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-lg">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BrowseByProducts;
