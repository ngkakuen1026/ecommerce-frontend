import { UploadCloud } from "lucide-react";
import React, { useState, useRef } from "react";
import authAxios from "../services/authAxios";
import { toast } from "react-toastify";
import { categoryAPI } from "../services/http-api";
import { useNavigate } from "react-router-dom";

const AdminAddCategory = () => {
  const [adminCategoryInput, setAdminCategoryInput] = useState({ name: "" });
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCategoryInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCategoryInput.name) {
      toast.error("[Admin] Category name is required");
      return;
    }
    if (!image) {
      toast.error("[Admin] Please upload a category image");
      return;
    }
    try {
      const res = await authAxios.post(`${categoryAPI.url}/admin/create`, {
        name: adminCategoryInput.name,
      });
      const categoryId = res.data.category.id;
      const formData = new FormData();
      formData.append("category-image", image);
      await authAxios.post(
        `${categoryAPI.url}/admin/${categoryId}/category-image`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("[Admin] Category and image uploaded successfully!");
      setAdminCategoryInput({ name: "" });
      setImage(null);
      setPreviewUrl("");
    } catch (err) {
      toast.error("[Admin] Failed to create category or upload image");
    }
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold mb-4">Add New Category</h1>
      <div className="flex justify-between gap-2 text-gray-500">
        <p className="text-gray-500 mb-8">Add a new category for products</p>
        <button
          onClick={onBack}
          className="text-gray-500 cursor-pointer hover:underline"
        >
          Back
        </button>
      </div>

      <div className="flex flex-row gap-6">
        <div className="flex-1 ">
          <label className="block font-semibold text-lg">Category Image</label>

          <div
            className={`w-full h-[48rem] border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition hover:opacity-70 ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-10 h-10 mb-2 text-blue-500" />
            <span className="text-sm mb-2">
              Drag & drop category image here, or click to select
            </span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>
        </div>
        <div className="flex-1">
          <label className="block font-semibold text-lg">Category Name</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Category Name"
            type="text"
            name="name"
            value={adminCategoryInput.name}
            onChange={handleInputChange}
          />

          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;
