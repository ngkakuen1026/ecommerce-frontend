import React, { useState } from "react";
import type { Categories } from "../../../../types/category";
import authAxios from "../../../../services/authAxios";
import { categoryAPI } from "../../../../services/http-api";
import { toast } from "react-toastify";
import { PencilOff, Save, SquarePen, Trash } from "lucide-react";
import Spinner from "../../../Reuseable/Spinner";

interface AdminCategoryDataInfoProps {
  category: Categories;
  isEditing: boolean;
  toggleEditing: () => void;
  refetchCategory: () => void;
}

const AdminCategoryDataInfo = ({
  category,
  isEditing,
  toggleEditing,
  refetchCategory,
}: AdminCategoryDataInfoProps) => {
  const [adminCategoryInput, setAdminCategoryInput] = useState({
    name: category.name,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCategoryInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log("No file selected.");
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await authAxios.put(`${categoryAPI.url}/admin/${category.id}/update`, {
        name: adminCategoryInput.name,
      });

      toast.success("[Admin] Category updated successfully");

      if (imageFile) {
        const formData = new FormData();
        formData.append("category-image", imageFile);

        console.log("[Admin] Uploading new category image:", imageFile);

        const imageResponse = await authAxios.post(
          `${categoryAPI.url}/admin/${category.id}/category-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(
          "[Admin] Category Image upload response:",
          imageResponse.data
        );
      }

      toggleEditing();
      refetchCategory();
    } catch (error) {
      toast.error("[Admin] Error updating Category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    toggleEditing();
    setAdminCategoryInput({
      name: category.name,
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete Category image? This action cannot be undone."
    );

    if (confirmDelete) {
      setIsLoading(true);
      try {
        const response = await authAxios.delete(
          `${categoryAPI.url}/admin/${category.id}/category-image`
        );
        console.log(
          "[Admin] Category image deleted successfully",
          response.data
        );

        toast.success("[Admin] Category image deleted successfully");
        refetchCategory();
      } catch (error) {
        console.error("Failed to delete category image:", error);
        toast.error("Failed to delete category image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Category image deletion canceled by the user.");
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="w-7/12">
        <div className="relative group">
          {isLoading ? (
            <Spinner />
          ) : (
            <img
              src={
                imagePreview ||
                category.image_url ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSka0Kz3pR2eFJHiTvC_Gi49PYZWf9_oxqVQ&s"
              }
              alt="Image of Category"
              className={`w-full h-[500px] mx-auto object-contain rounded border `}
            />
          )}

          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label
              htmlFor="category-image"
              className={`text-white text-lg font-semibold text-center ${
                isEditing ? "cursor-pointer" : ""
              }`}
            >
              {isEditing
                ? category?.image_url
                  ? "Edit Category Image"
                  : "Add Category Image"
                : "Click Edit Category button to Change Category Image"}
            </label>
            <input
              type="file"
              id="category-image"
              name="category image"
              accept="image/*"
              className="hidden"
              disabled={!isEditing}
              onChange={handleFileChange}
            />
          </div>
          {category?.image_url && isEditing ? (
            <button
              type="button"
              onClick={handleDeleteImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Delete profile image"
            >
              <Trash />
            </button>
          ) : null}
        </div>
      </div>
      <div className="w-5/12">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl">
            Category Name:{" "}
            <span className="text-gray-600">{category.name}</span>
          </h1>
          <div className="flex gap-2 items-center">
            <button
              title="Edit Category"
              type="button"
              className={`${
                isEditing ? "hidden" : ""
              } cursor-pointer hover:opacity-70`}
              onClick={toggleEditing}
              disabled={isLoading}
            >
              <SquarePen size={18} />
            </button>
            <button
              title="Save Changes"
              type="button"
              className={`${
                isEditing ? "" : "hidden"
              } cursor-pointer hover:opacity-70`}
              onClick={handleSave}
              disabled={isLoading || !isEditing}
            >
              <Save size={18} />
            </button>
            <button
              title="Cancel Editing"
              type="button"
              className={`${
                isEditing ? "" : "hidden"
              } cursor-pointer hover:opacity-70`}
              onClick={handleCancel}
              disabled={isLoading || !isEditing}
            >
              <PencilOff size={18} />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">Category Name</label>

          <input
            className={`w-full px-3 py-2 border border-gray-300 rounded ${
              !isEditing ? "cursor-not-allowed" : null
            }`}
            placeholder="Category Name"
            type="text"
            name="name"
            disabled={isLoading || !isEditing}
            value={adminCategoryInput.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryDataInfo;
