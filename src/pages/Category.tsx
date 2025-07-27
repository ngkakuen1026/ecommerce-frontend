import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { Categories } from "../types/category";
import type { Product } from "../types/product";
import { categoryAPI, productAPI, wishlistAPI } from "../services/http-api";

import RandomCategoryCards from "../components/Category/RandomCategoryCards";
import CategorySidebar from "../components/Category/CategorySidebar";
import ProductGrid from "../components/Category/ProductGrid";
import authAxios from "../services/authAxios";
import type { WishlistItem } from "../types/wishlist";

const Category = () => {
  const [randomCategories, setRandomCategories] = useState<Categories[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null
  );
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Price Filter
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const [tempMinPrice, setTempMinPrice] = useState<number>(0);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(100000);

  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Sorting
  const [sortOption, setSortOption] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Filtered Products
  const priceFilteredProducts = products.filter((product) => {
    const price = product.price;
    const withinMin = minPrice === "" || price >= minPrice;
    const withinMax = maxPrice === "" || price <= maxPrice;
    return withinMin && withinMax;
  });

  const currentProducts = priceFilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(priceFilteredProducts.length / productsPerPage);

  // Fetch categories
  useEffect(() => {
    authAxios
      .get(`${categoryAPI.url}`)
      .then((res) => {
        const all = res.data.categories;
        console.log("Fetched Categories:", all); // Log fetched categories
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomCategories(random);
        setCategories(all);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // Fetch all products (initial load fallback)
  useEffect(() => {
    authAxios
      .get(productAPI.url)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = () => {
      authAxios
        .get(`${wishlistAPI.url}/me`)
        .then((res) => setWishlist(res.data.wishlist))
        .catch(() => setWishlist([]));
    };

    fetchWishlist();

    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);
  // Handle sorting
  useEffect(() => {
    if (!sortOption || products.length === 0) return;

    const sorted = [...products];

    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      default:
        break;
    }

    setProducts(sorted);
    setCurrentPage(1);
  }, [sortOption]);

  // Handle filter based on URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryName = params.get("name");
    const query = params.get("query");

    const fetchByCategory = async (cat: Categories) => {
      try {
        setLoading(true);
        const res = await authAxios.get(`${productAPI.url}/category/${cat.id}`);
        setProducts(res.data.products);
        setSelectedCategory(cat);
        setSearchQuery("");
        setActiveSearchQuery("");
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch category products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchBySearch = async (term: string) => {
      try {
        setLoading(true);
        const res = await authAxios.get(
          `${productAPI.url}/search?query=${encodeURIComponent(term)}`
        );
        setProducts(res.data.products);
        setActiveSearchQuery(term);
        setSelectedCategory(null);
        setCurrentPage(1);
      } catch (err) {
        console.error("Failed to fetch search products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName && categories.length > 0) {
      const match = categories.find(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      if (match) fetchByCategory(match);
    } else if (query) {
      fetchBySearch(query);
    }
  }, [location.search, categories]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/categories?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleCategoryClick = (category: Categories) => {
    setSearchQuery("");
    setActiveSearchQuery("");
    setSelectedCategory(category);
    navigate(`/categories?name=${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="p-10 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        {/* Random Categories Grid */}
        <RandomCategoryCards
          categories={randomCategories}
          onCategoryClick={handleCategoryClick}
        />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              handleCategoryClick={handleCategoryClick}
              tempMinPrice={tempMinPrice}
              tempMaxPrice={tempMaxPrice}
              setTempMinPrice={setTempMinPrice}
              setTempMaxPrice={setTempMaxPrice}
              applyPriceFilter={() => {
                setMinPrice(tempMinPrice);
                setMaxPrice(tempMaxPrice);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Product Grid Section */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {activeSearchQuery
                  ? `Search Results for "${activeSearchQuery}"`
                  : selectedCategory
                  ? `All products for "${selectedCategory.name}"`
                  : "All Products"}
              </h2>

              {/* Sort & Pagination */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Sort:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="">Sort by…</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>

                {/* Pagination */}
                {products.length > productsPerPage && (
                  <div className="flex justify-center items-center gap-4">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded border text-sm disabled:opacity-50 hover:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded border text-sm disabled:opacity-50"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Product List */}
            <ProductGrid
              products={currentProducts}
              loading={loading}
              wishlist={wishlist}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
