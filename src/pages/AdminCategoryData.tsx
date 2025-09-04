import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Categories } from "../types/category";
import authAxios from "../services/authAxios";
import { categoryAPI } from "../services/http-api";
import Spinner from "../components/Reuseable/Spinner";
import AdminCategoryDataBreadcrumb from "../components/AdminPanel/AdminCategoryList/AdminCategoryData/AdminCategoryDataBreadcrumb";
import AdminCategoryDataInfo from "../components/AdminPanel/AdminCategoryList/AdminCategoryData/AdminCategoryDataInfo";

const AdminCategoryData = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Categories>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await authAxios.get(`${categoryAPI.url}/${id}`);
      console.log("[Admin] Category data fetched successfully", response.data);
      setCategory(response.data.category);
    } catch (error) {
      console.error("[Admin] Error fetching category data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const onBack = () => {
    navigate(-1);
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      {isLoading ? (
        <Spinner />
      ) : category ? (
        <div>
          <h1 className="text-4xl font-semibold mb-4">
            Details for Category "{category.name}"
          </h1>

          <AdminCategoryDataBreadcrumb category={category} onBack={onBack} />

          <AdminCategoryDataInfo
            category={category}
            isEditing={isEditing}
            toggleEditing={toggleEditing}
            refetchCategory={fetchCategory}
          />
        </div>
      ) : (
        <p>Category Not found.</p>
      )}
    </div>
  );
};

export default AdminCategoryData;
