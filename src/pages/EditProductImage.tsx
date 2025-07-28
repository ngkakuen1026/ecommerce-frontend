import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UploadCloud, Trash2 } from "lucide-react";
import { productAPI } from "../services/http-api";
import authAxios from "../services/authAxios";
import ProductImageBreadcrumb from "../components/Dashboard/Products/EditProductImage/ProductImageBreadcrumb";
import { toast } from "react-toastify";

interface ProductImage {
  id: string | number;
  url: string;
}

const EditProductImage: React.FC = () => {
  const [dbImages, setDbImages] = useState<ProductImage[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [productTitle, setProductTitle] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch existing images and product title from DB
  useEffect(() => {
    if (!id) return;
    authAxios
      .get(`${productAPI.url}/${id}`)
      .then((res) => {
        const images = res.data.product.images.map(
          (img: { id: string | number; image_url: string }) => ({
            id: img.id,
            url: img.image_url,
          })
        );
        setDbImages(images);
        setProductTitle(res.data.product.title || "");
      })
      .catch(() => {
        setDbImages([]);
        setProductTitle("");
      });
  }, [id]);

  // Handle new image upload (local, not yet in DB)
  const handleImageUpload = (files: FileList | File[]) => {
    const fileArray = Array.from(files).slice(
      0,
      10 - dbImages.length - images.length
    );
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleImageUpload(e.target.files);
  };

  // Remove local (not yet uploaded) image
  const removeLocalImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  // Remove image from DB
  const removeDbImage = async (imgId: string | number) => {
    if (!window.confirm("Remove this image?")) return;
    try {
      await authAxios.delete(`${productAPI.url}/${id}/images/${imgId}`);
      setDbImages((prev) => prev.filter((img) => img.id !== imgId));
      toast.success("Image removed successfully!");
    } catch {
      toast.error("Failed to remove image.");
    }
  };

  // Upload new images to DB
  const handleSubmit = async () => {
    if (!id || images.length === 0) return;
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    setUploading(true);

    try {
      const res = await authAxios.post(
        `${productAPI.url}/${id}/images`,
        formData
      );
      // Refresh DB images after upload
      setDbImages(res.data.images || []);
      setImages([]);
      setPreviewUrls([]);
      toast.success("Images uploaded successfully!");
    } catch (err) {
      console.log("err: " + err);
      toast.error("Something went wrong while uploading images.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const totalImages = dbImages.length + images.length;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Edit Product Images
      </h1>
      <ProductImageBreadcrumb
        onBack={() => navigate(-1)}
        productTitle={productTitle}
      />
      <p className="text-gray-500 mb-3">You can upload up to 10 images</p>
      <p className="text-sm text-gray-600 mb-4">{totalImages} / 10 uploaded</p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full h-64 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer transition relative mb-6
        ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
      >
        <div className="flex flex-col items-center pointer-events-none">
          <UploadCloud className="w-6 h-6 mb-1" />
          <span className="text-sm">
            {isDragging ? "Drop images here" : "Click or drag & drop to upload"}
          </span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          disabled={totalImages >= 10}
        />
      </label>

      <div className="flex flex-wrap gap-4 mb-4 w-full">
        {/* Existing DB images */}
        {dbImages.map((img, index) => (
          <div key={img.id} className="relative w-32 h-32">
            <img
              src={img.url}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => removeDbImage(img.id)}
              className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
              title="Remove from product"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {/* Local images not yet uploaded */}
        {previewUrls.map((url, index) => (
          <div key={`local-${index}`} className="relative w-32 h-32">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => removeLocalImage(index)}
              className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 rounded text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={images.length === 0 || uploading || totalImages > 10}
          className="px-6 py-2.5 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>
    </div>
  );
};

export default EditProductImage;
