import React, { useState } from "react";
import type { Product } from "../../../../types/product";
import type { Categories } from "../../../../types/category";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { PencilOff, Save, SquarePen, Upload } from "lucide-react";
import authAxios from "../../../../services/authAxios";
import TinyMCEEditor from "../../../Reuseable/TinyMCEEditor";
import { toast } from "react-toastify";
import { productAPI } from "../../../../services/http-api";

interface AdminProductInfoProps {
  product: Product;
  categories: Categories[];
  isEditing: boolean;
  toggleEditing: () => void;
  pendingImages: File[];
  setPendingImages: (files: File[]) => void;
  refetchProduct: () => void;
}

const AdminProductInfo: React.FC<AdminProductInfoProps> = ({
  product,
  categories,
  isEditing,
  toggleEditing,
  pendingImages,
  setPendingImages,
  refetchProduct,
}) => {
  const [adminProductInput, setAdminProductInput] = useState({
    category_id: product.category_id,
    title: product.title,
    description: product.description,
    price: product.price,
    discountedPrice: product.discountedPrice,
    discount: product.discount,
    quantity: product.quantity,
    status: product.status,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAdminProductInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setAdminProductInput((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleCancel = () => {
    toggleEditing();
    setAdminProductInput({
      category_id: product.category_id,
      title: product.title,
      description: product.description,
      price: product.price,
      discountedPrice: product.discountedPrice,
      discount: product.discount,
      quantity: product.quantity,
      status: product.status,
    });
    setPendingImages([]);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update product info
      await authAxios.patch(`${productAPI.url}/admin/${product.id}/update`, {
        title: adminProductInput.title,
        description: adminProductInput.description,
        category_id: Number(adminProductInput.category_id),
        quantity: Number(adminProductInput.quantity),
        status: adminProductInput.status,
        price: Number(adminProductInput.price),
        discount: Number(adminProductInput.discount),
      });

      // Upload images if any
      if (pendingImages.length > 0) {
        const formData = new FormData();
        pendingImages.forEach((file) => {
          formData.append("images", file);
        });
        await authAxios.post(
          `${productAPI.url}/admin/${product.id}/images`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setPendingImages([]);
      }

      toast.success("[Admin] Product data updated successfully");
      toggleEditing();
      refetchProduct();
    } catch (error) {
      toast.error("[Admin] Error updating product data");
    } finally {
      setIsLoading(false);
    }
  };

  const sanitizedDescription = DOMPurify.sanitize(product.description);

  return (
    <div className="flex-1 admin-product-info">
      <div className="flex flex-row gap-2 justify-between">
        <div className="flex flex-row items-center gap-2">
          <Link
            to={`/product/${product.id}`}
            title={`Public Link of Product "${product.title}"`}
            target="_blank"
            className="text-2xl font-semibold hover:opacity-70 "
          >
            {product.title}
          </Link>
          <span className="text-lg text-gray-600">Listed By:</span>

          <Link
            to={`/user/${product.user.username}`}
            className="font-semibold text-lg flex gap-2 items-center transition cursor-pointer hover:opacity-70"
          >
            {product.user.username}
            <img
              src={product.user.profile_image}
              alt={product.user.username}
              className="w-14 h-14 rounded-full object-cover"
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <button
            title="Edit User"
            type="button"
            className={`${
              isEditing ? "hidden" : ""
            } cursor-pointer hover:opacity-70`}
            onClick={toggleEditing}
            disabled={isLoading}
          >
            <SquarePen size={18} />
          </button>
          {isEditing && (
            <>
              <label
                htmlFor="product-images-upload"
                title="Upload Product Images"
              >
                <Upload
                  size={18}
                  className={`${
                    isEditing ? "" : "hidden"
                  } cursor-pointer hover:opacity-70`}
                />
              </label>
              <input
                id="product-images-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (!e.target.files) return;
                  const files = Array.from(e.target.files);
                  setPendingImages(files);
                }}
                disabled={isLoading}
              />
            </>
          )}
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
      <div>
        <p className="text-lg">
          Listed at:{" "}
          <span className="font-semibold">
            {product.created_at
              ? new Date(product.created_at).toLocaleString("en")
              : "Unknown"}
          </span>
        </p>
      </div>
      <div
        className="text-lg leading-relaxed text-gray-800 mt-4"
        dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
      />
      <div className="mt-4">
        <label className="block font-semibold text-lg">Product Name</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Product Name"
          type="text"
          name="title"
          disabled={isLoading || !isEditing}
          value={adminProductInput.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block font-semibold text-lg mt-4">
          Product Description
        </label>
        <TinyMCEEditor
          value={adminProductInput.description}
          onEditorChange={handleEditorChange}
          disabled={isLoading || !isEditing}
        />
      </div>
      <div className="mt-4">
        <div className="flex flex-col-2 gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-lg">Price</label>
            <input
              name="price"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={isLoading || !isEditing}
              value={adminProductInput.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-lg">Discount</label>
            <input
              name="discount"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={isLoading || !isEditing}
              value={adminProductInput.discount}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col-2 gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-lg">Quantity</label>
            <input
              name="quantity"
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              disabled={isLoading || !isEditing}
              value={adminProductInput.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold text-lg">Category</label>
            <select
              className="w-full border px-3 py-2 border-gray-300 rounded"
              name="category_id"
              value={adminProductInput.category_id}
              onChange={handleInputChange}
              disabled={isLoading || !isEditing}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductInfo;
