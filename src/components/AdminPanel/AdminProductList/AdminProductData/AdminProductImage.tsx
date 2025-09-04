import React, { useState } from "react";
import type { Product, ProductImage } from "../../../../types/product";
import { Trash2 } from "lucide-react";
import authAxios from "../../../../services/authAxios";
import { toast } from "react-toastify";
import { productAPI } from "../../../../services/http-api";
import Spinner from "../../../Reuseable/Spinner";

interface AdminProductImageProps {
  product: Product;
  selectedImage: string;
  onSelect: (url: string) => void;
  isEditing: boolean;
  pendingImages: File[];
  onImageUpdated?: () => void;
}

const AdminProductImage: React.FC<AdminProductImageProps> = ({
  product,
  selectedImage,
  onSelect,
  isEditing,
  pendingImages,
  onImageUpdated,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteImage = async (imageId: number) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    setIsLoading(true);
    try {
      await authAxios.delete(
        `${productAPI.url}/admin/${product.id}/images/${imageId}`
      );
      toast.success("[Admin] Image deleted successfully!");
      if (onImageUpdated) onImageUpdated();
    } catch (err) {
      toast.error("[Admin] Failed to delete image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[500px] mx-auto object-contain mb-4 rounded border"
          />
        )}
      </div>

      {pendingImages.length > 0 && (
        <div>
          <h1 className="mb-2 text-gray-600">Preview Upload Images</h1>
          <div className="flex flex-wrap gap-4 mb-4">
            {pendingImages.map((file, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded border border-blue-400 cursor-pointer hover:opacity-70"
                  onClick={() => onSelect(URL.createObjectURL(file))}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex mb-4 justify-between text-gray-600">
        <p>Only 10 images allowed for products</p>
        <p>{product.images.length} / 10 images uploaded</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {product.images && product.images.length > 0 ? (
          product.images.map((img: ProductImage) => (
            <div className="relative w-32 h-32" key={img.id}>
              <img
                src={img.image_url}
                onClick={() => onSelect(img.image_url)}
                alt="Thumbnail"
                className={`w-full h-full object-cover rounded border cursor-pointer transition hover:scale-110 ${
                  selectedImage === img.image_url
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              />
              {isEditing && (
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
                  title="Remove"
                  onClick={() => handleDeleteImage(img.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <img
            src="https://commercial.bunn.com/img/image-not-available.png"
            alt="No images available"
            className="w-24 h-24 object-cover rounded border border-gray-300"
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductImage;
