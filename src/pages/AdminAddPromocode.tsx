import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAxios from "../services/authAxios";
import { promotionAPI } from "../services/http-api";
import { toast } from "react-toastify";

const AdminAddPromocode = () => {
  const [adminPromotionInput, setAdminPromotionInput] = useState({
    code: "",
    discount_type: "",
    discount_value: "",
    start_date: new Date(),
    end_date: "",
    usage_limit: "1",
    min_order_value: "",
    user_limit: "",
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAdminPromotionInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const resposne = await authAxios.post(
        `${promotionAPI.url}/admin/promotion/create`,
        adminPromotionInput
      );
      console.log(`[Admin] Promotion created successfully, ${resposne.data}`);

      toast.success("[Admin] Promotion created successfully");
      navigate("/admin-panel/all-promo-codes");
    } catch (error) {
      toast.error("[Admin] Error creating promotion");
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold mb-4">Add New Promotion Code</h1>
      <div className="flex justify-between gap-2 text-gray-500">
        <p className="text-gray-500 mb-8">
          Add a new promotion code for product
        </p>
        <button
          onClick={onBack}
          className="text-gray-500 cursor-pointer hover:underline"
        >
          Back
        </button>
      </div>
      <div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">Promotion Code</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="code"
            type="text"
            name="code"
            disabled={isLoading}
            value={adminPromotionInput.code.toUpperCase()}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">Promotion Type</label>
          <select
            className="w-full border px-3 py-2 border-gray-300 rounded"
            name="discount_type"
            value={adminPromotionInput.discount_type}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">Select Discount Type</option>
            <option value="fixed">Fixed Money Discount</option>
            <option value="percentage">Percentage Discount</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">Promotion Value</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Promotion Value"
            type="number"
            name="discount_value"
            disabled={isLoading}
            value={adminPromotionInput.discount_value}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">Start Date</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="date"
            name="start_date"
            disabled={isLoading}
            value={
              adminPromotionInput.start_date
                ? new Date(adminPromotionInput.start_date)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">End Date</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="date"
            name="end_date"
            disabled={isLoading}
            value={
              adminPromotionInput.end_date
                ? new Date(adminPromotionInput.end_date)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">Usage Limit</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="number"
            name="usage_limit"
            disabled={isLoading}
            value={adminPromotionInput.usage_limit}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">
            Minimum Order Value
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="number"
            name="min_order_value"
            disabled={isLoading}
            value={adminPromotionInput.min_order_value}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label className="block font-semibold text-lg">
            User Limit (How many times a signle user can apply this)
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            type="number"
            name="user_limit"
            disabled={isLoading}
            value={adminPromotionInput.user_limit}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Add Promotion
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddPromocode;
