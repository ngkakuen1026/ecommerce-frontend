import { useEffect, useState } from "react";
import type { Categories } from "../types/category";
import type { Product } from "../types/product";
import axios from "axios";
import { categoryAPI, prodcutAPI } from "../services/http-api";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const [randomCategories, setRandomCategories] = useState<Categories[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  //Product Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    axios
      .get(`${categoryAPI.url}`)
      .then((res) => {
        const all = res.data.categories;
        const random = all.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomCategories(random);
        setCategories(all);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(prodcutAPI.url);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchAllProducts();
  }, []);

  const handleSearch = async () => {
    try {
      const endpoint = searchQuery
        ? `${prodcutAPI.url}/search?query=${encodeURIComponent(searchQuery)}`
        : `${prodcutAPI.url}`;
      const res = await axios.get(endpoint);
      setProducts(res.data.products);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  return (
    <div className="p-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {randomCategories.map((category) => (
          <div
            key={category.id}
            className="relative h-96 rounded-lg overflow-hidden shadow group cursor-pointer bg-cover bg-center"
            style={{ backgroundImage: `url(${category.image_url})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-300" />
            <div className="absolute top-4 left-4 z-10">
              <h2 className="text-white text-xl font-bold drop-shadow-sm">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm sm:text-base"
            />
            <Search
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-600 cursor-pointer"
            />
          </div>

          {/* Category List */}
          <div>
            <h1 className="text-xl font-semibold mb-2 border-b pb-1">
              Browse by Category:
            </h1>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-gray-800 hover:text-blue-600 sm:text-lg text-base"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Products */}
        <div className="lg:col-span-3">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              Search Result for {searchQuery}
            </h2>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600">
                Sort:
              </label>
              <select
                id="sort"
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option>Sort by…</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
              {products.length > productsPerPage && (
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded border text-sm disabled:opacity-50"
                  >
                    Previous
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
                    Next
                  </button>
                </div>
              )}
            </div>
            {/* Pagination */}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
