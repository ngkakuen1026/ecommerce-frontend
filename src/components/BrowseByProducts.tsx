import axios from "axios";
import { useEffect, useState } from "react";
import { prodcutAPI } from "../services/http-api";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

const BrowseByProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${prodcutAPI.url}`)
      .then((res) => {
        console.log("API response:", res.data);
        setProducts(res.data.products);
        console.log(res.data.prodcuts);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <div className="p-10 bg-white">
      <h1 className="pb-5 text-4xl font-bold text-center">Product On Sale</h1>
      <div className="grid max-w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-lg">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BrowseByProducts;
