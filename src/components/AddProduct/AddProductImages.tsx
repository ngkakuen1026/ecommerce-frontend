import React, { useState, type ChangeEvent, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UploadCloud, Trash2 } from "lucide-react";
import { productAPI } from "../../services/http-api";
import authAxios from "../../services/authAxios";

const AddProductImages: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleImageUpload = (files: FileList | File[]) => {
    const fileArray = Array.from(files).slice(0, 10 - images.length);
    const previews = fileArray.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleImageUpload(e.target.files);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previewUrls];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    setUploading(true);

    try {
      const res = await authAxios.post(`${productAPI.url}/${id}/images`, formData);

      console.log("Upload response:", res.data);
      alert("Images uploaded successfully!");
      navigate(`/product/${id}`);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong while uploading images.");
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => {
    navigate(`/product/${id}`);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Product Images</h1>
      <p className="text-gray-500 mb-3">You can upload up to 10 images</p>
      <p className="text-sm text-gray-600 mb-4">{images.length} / 10 uploaded</p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full h-64 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer transition relative mb-6
        ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-blue-400"}`}
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
        />
      </label>

      <div className="flex flex-wrap gap-4 mb-4 w-full">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative w-32 h-32">
            <img
              src={url}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={handleSkip}
          className="px-6 py-2.5 rounded text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          Skip for now
        </button>
        <button
          onClick={handleSubmit}
          disabled={images.length === 0 || uploading}
          className="px-6 py-2.5 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>
    </div>
  );
};

export default AddProductImages;