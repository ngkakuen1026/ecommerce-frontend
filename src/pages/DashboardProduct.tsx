import { useEffect, useState } from "react";
import { categoryAPI, productAPI } from "../services/http-api";
import authAxios from "../services/authAxios";
import type { Product } from "../types/product";
import type { Categories } from "../types/category";
import ProductControls from "../components/Dashboard/Products/ProductControls";
import ProductTable from "../components/Dashboard/Products/ProductTable";
import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";

const DashboardProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [productIdSort, setProductIdSort] = useState<"asc" | "desc" | "">("");
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    authAxios
      .get(`${categoryAPI.url}`)
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  useEffect(() => {
    let active = true;
    setSearching(true);

    const fetchProducts = async () => {
      try {
        let res;
        if (searchQuery.trim() === "") {
          res = await authAxios.get(`${productAPI.url}/me`);
        } else {
          res = await authAxios.get(
            `${productAPI.url}/me/search?query=${encodeURIComponent(searchQuery)}`
          );
        }
        if (active) {
          setProducts(res.data.products || []);
          setCurrentPage(1);
        }
      } catch {
        if (active) setProducts([]);
      } finally {
        if (active) setSearching(false);
      }
    };

    const timer = setTimeout(fetchProducts, 400);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const sortedProducts = [...products];
  switch (sortOption) {
    case "priceLowHigh":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "priceHighLow":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      sortedProducts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    default:
      if (productIdSort === "asc") {
        sortedProducts.sort((a, b) => a.id - b.id);
      } else if (productIdSort === "desc") {
        sortedProducts.sort((a, b) => b.id - a.id);
      }
      break;
  }

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const getCategoryName = (catId: number) => {
    const cat = categories.find((c) => c.id === catId);
    return cat ? cat.name : "Unknown";
  };

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await authAxios.delete(`${productAPI.url}/${productId}/delete`);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-6">Manage Listing Products</h1>
      <div className="flex justify-between">
        <h2 className="text-xl text-gray-500 mb-4">
          Manage your listing products, add, edit and delete product.
        </h2>
        <Link
          to="/add-product"
          className="border px-2 py-1 rounded-xl border-gray-400 text-sm flex items-center gap-1 hover:opacity-50"
        >
          <CirclePlus size={14} />
          Add Product
        </Link>
      </div>

      <ProductControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        productsPerPage={productsPerPage}
        setProductsPerPage={setProductsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        searching={searching}
      />
      <ProductTable
        products={currentProducts}
        categories={categories}
        getCategoryName={getCategoryName}
        handleDelete={handleDelete}
        productIdSort={productIdSort}
        setProductIdSort={setProductIdSort}
      />
    </div>
  );
};

export default DashboardProducts;
