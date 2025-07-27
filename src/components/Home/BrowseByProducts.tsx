import { useEffect, useState } from "react";
import { categoryAPI, productAPI, wishlistAPI } from "../../services/http-api";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { RefreshCcw } from "lucide-react";
import ProductCard from "../Reuseable/ProductCard";
import authAxios from "../../services/authAxios";
import type { WishlistItem } from "../../types/wishlist";
import type { Categories } from "../../types/category";

const BrowseByProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await authAxios.get(`${categoryAPI.url}`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchWishlist = () => {
      authAxios
        .get(`${wishlistAPI.url}/me`)
        .then((res) => setWishlist(res.data.wishlist))
        .catch(() => setWishlist([]));
    };

    authAxios
      .get(`${productAPI.url}`)
      .then((res) => {
        const fetchedProducts = res.data.products;
        const shuffled = [...fetchedProducts].sort(() => 0.5 - Math.random());
        setAllProducts(shuffled);
        setVisibleProducts(shuffled.slice(0, 12));
      })
      .catch((error) => console.error("Failed to fetch products:", error));

    fetchCategories();
    fetchWishlist();

    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  const shuffleProducts = () => {
    const reshuffled = [...allProducts].sort(() => 0.5 - Math.random());
    setVisibleProducts(reshuffled.slice(0, 12));
  };

  return (
    <div className="p-10 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between pb-5">
          <div>
            <h1 className="text-4xl font-bold">Products On Sale</h1>
            <button
              onClick={shuffleProducts}
              className="flex items-center gap-1 mt-2 text-sm text-gray-600 hover:opacity-60 cursor-pointer"
            >
              See Other Products
              <RefreshCcw size={12} className="inline" />
            </button>
          </div>

          <Link
            to="/categories"
            className="text-lg text-gray-600 hover:opacity-50 whitespace-nowrap"
          >
            View all Products...
          </Link>
        </div>

        <div className="grid max-w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-lg">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlist={wishlist}
              categories={categories}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseByProducts;
