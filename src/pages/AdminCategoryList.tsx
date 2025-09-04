import { useEffect, useState } from "react";
import type { Categories } from "../types/category";
import authAxios from "../services/authAxios";
import { categoryAPI } from "../services/http-api";
import { toast } from "react-toastify";
import AdminCategoryListControl from "../components/AdminPanel/AdminCategoryList/AdminCategoryListControl";
import AdminCategoryListTable from "../components/AdminPanel/AdminCategoryList/AdminCategoryListTable";

const AdminCategoryList = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [categoriesPerPage, setCategoriesPerPage] = useState(10);

  const fetchCategories = async () => {
    let active = true;
    setSearching(true);

    try {
      let res;
      if (searchQuery.trim() === "") {
        res = await authAxios.get(`${categoryAPI.url}`);
      } else {
        res = await authAxios.get(
          `${
            categoryAPI.url
          }/admin/all-categories/search?query=${encodeURIComponent(
            searchQuery
          )}`
        );
      }
      if (active) {
        setCategories(res.data.categories);
        console.log("Search response:", res.data);
        setCurrentPage(1);
      }
      console.log("[Admin] Users data fetched successfully", res.data);
    } catch (error) {
      if (active) setCategories([]);
      console.error("Error fetching admin data", error);
    } finally {
      if (active) setSearching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchQuery]);

  const sortedCategories = [...categories];
  switch (sortOption) {
    case "des":
      sortedCategories.sort((a, b) => b.id - a.id);
      break;
    case "asc":
      sortedCategories.sort((a, b) => a.id - b.id);
      break;
    case "alpasc":
      sortedCategories.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      break;
    case "alpdes":
      sortedCategories.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
      break;
    default:
      break;
  }

  // Pagination
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategory = sortedCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(sortedCategories.length / categoriesPerPage);

  const deleteCategory = async (categoryId: number) => {
    try {
      const repsonse = await authAxios.delete(
        `${categoryAPI.url}/admin/${categoryId}/delete`
      );
      toast.success(`Category deleted successfully`);
      console.log("[Admin] Category deleted successfully", repsonse.data);
    } catch (error) {
      console.error("[Admin] Error deleting product", error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold mb-4">All Categories</h1>
      <h2 className="text-xl text-gray-500 mb-4">
        This is the admin panel where you can manage all categories. You can
        view the category's details, edit their information, and delete the
        category if necessary.
      </h2>

      <AdminCategoryListControl
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categoriesPerPage={categoriesPerPage}
        setCategoriesPerPage={setCategoriesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        searching={searching}
      />

      <AdminCategoryListTable
        categories={currentCategory}
        setCategories={setCategories}
        deleteCategory={deleteCategory}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminCategoryList;
