import React, { useState, useEffect } from "react";
import axios from "axios";
import { categoryAPI, productAPI } from "../../services/http-api";
import authAxios from "../../services/authAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TinyMCEEditor from "../Reuseable/TinyMCEEditor";

const AddProductInfo: React.FC = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    discount: "",
    status: "available",
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${categoryAPI.url}`);
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setUserInput((prev) => ({ ...prev, description: content }));
  };

  const handleSubmit = async () => {
    const productData = {
      title: userInput.title,
      description: userInput.description,
      categoryId: Number(userInput.category),
      quantity: Number(userInput.quantity),
      status: userInput.status,
      price: Number(userInput.price),
      discount: Number(userInput.discount)
    };

    try {
      const res = await authAxios.post(`${productAPI.url}/create`, productData);
      const productId = res.data?.product?.id;

      if (productId) {
        navigate(`/add-images/${productId}`);
      } else {
        toast.error("Failed to create product");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Add New Product</h1>
      <p className="text-gray-500 mb-8">Add a new product to your store</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side */}
        <div className="space-y-6">
          <div className="border rounded-md p-4 space-y-3">
            <h2 className="font-semibold text-gray-800">
              Name and Description
            </h2>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Product Name"
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleChange}
            />
            <TinyMCEEditor
              value={userInput.description}
              onEditorChange={handleEditorChange}
            />
          </div>

          <div className="border rounded-md p-4 space-y-3">
            <h2 className="font-semibold text-gray-800">Category</h2>
            <select
              className="w-full border rounded px-3 py-2"
              name="category"
              value={userInput.category}
              onChange={handleChange}
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

        {/* Right side */}
        <div className="space-y-6">
          <div className="border rounded-md p-4 space-y-3">
            <h2 className="font-semibold text-gray-800">Product Pricing</h2>
            <div className="flex gap-4">
              <input
                className="w-1/2 border rounded px-3 py-2"
                placeholder="Price"
                type="number"
                name="price"
                value={userInput.price}
                onChange={handleChange}
              />
              <input
                className="w-1/2 border rounded px-3 py-2"
                placeholder="Discount"
                type="number"
                name="discount"
                value={userInput.discount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-3">
            <h2 className="font-semibold text-gray-800">Available Stock</h2>
            <input
              className="w-full border rounded px-3 py-2"
              placeholder="Product Stock"
              type="number"
              name="quantity"
              value={userInput.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="border rounded-md p-4 space-y-3">
            <h2 className="font-semibold text-gray-800">Status</h2>
            <select
              className="w-full border rounded px-3 py-2"
              name="status"
              value={userInput.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="out of stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductInfo;
