import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import authAxios from "../services/authAxios";
import { categoryAPI, productAPI } from "../services/http-api";
import type { Categories } from "../types/category";
import { toast } from "react-toastify";
import AdminProductListControl from "../components/AdminPanel/AdminProductList/AdminProductListControl";
import AdminProductListTable from "../components/AdminPanel/AdminProductList/AdminProductListTable";

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await authAxios.get(`${categoryAPI.url}`);
      console.log(
        "[Admin] Categories data fetched successfully",
        response.data
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("[Admin] Error fetching categories data", error);
    }
  };

  const fetchProducts = async () => {
    let active = true;
    setSearching(true);

    try {
      let res;
      if (searchQuery.trim() === "") {
        res = await authAxios.get(`${productAPI.url}/admin/all-products`);
      } else {
        res = await authAxios.get(
          `${
            productAPI.url
          }/admin/all-products/search?query=${encodeURIComponent(searchQuery)}`
        );
      }
      if (active) {
        setProducts(res.data.products);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("[Admin] Error fetching products data", error);
      if (active) setProducts([]);
    } finally {
      setIsLoading(false);
      if (active) setSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 400);
    fetchCategories();

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const sortedProducts = [...products];
  switch (sortOption) {
    case "des":
      sortedProducts.sort((a, b) => b.id - a.id);
      break;
    case "asc":
      sortedProducts.sort((a, b) => a.id - b.id);
      break;
    case "priceLowHigh":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "priceHighLow":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "alpasc":
      sortedProducts.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      break;
    case "alpdes":
      sortedProducts.sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase())
      );
      break;
    case "newest":
      sortedProducts.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "oldest":
      sortedProducts.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    default:
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

  const deleteProduct = async (productId: number) => {
    try {
      const repsonse = await authAxios.delete(
        `${productAPI.url}/admin/${productId}/delete`
      );
      toast.success(`[Admin] Product deleted successfully`);
      console.log("[Admin] Product deleted successfully", repsonse.data);
    } catch (error) {
      console.error("[Admin] Error deleting product", error);
    }
  };

  const getCategoryName = (catId: number) => {
    const cat = categories.find((category) => category.id === catId);
    return cat ? cat.name : "Unknown";
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold mb-4">All Listed Products</h1>
      <h2 className="text-xl text-gray-500 mb-4">
        This is the admin panel where you can manage all listed products. You
        can view the product's details, edit their information, and delete the
        product if necessary.
      </h2>

      <AdminProductListControl
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

      <AdminProductListTable
        products={currentProducts}
        setProducts={setProducts}
        getCategoryName={getCategoryName}
        deleteProduct={deleteProduct}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminProductList;
