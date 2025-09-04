import React, { useState } from "react";
import type { PromotionType } from "../../../../types/promotion";
import { toast } from "react-toastify";
import authAxios from "../../../../services/authAxios";
import { promotionAPI } from "../../../../services/http-api";
import { PencilOff, Save, SquarePen } from "lucide-react";

interface AdminPromotionDataInfo {
  promotion: PromotionType;
  isEditing: boolean;
  toggleEditing: () => void;
  refetchPromotion: () => void;
}

const AdminPromotionDataInfo = ({
  promotion,
  isEditing,
  toggleEditing,
  refetchPromotion,
}: AdminPromotionDataInfo) => {
  const [adminPromotionInput, setAdminPromotionInput] = useState({
    code: promotion.code,
    discount_type: promotion.discount_type,
    discount_value: promotion.discount_value,
    start_date: promotion.start_date,
    end_date: promotion.end_date,
    usage_limit: promotion.usage_limit,
    min_order_value: promotion.min_order_value,
    user_limit: promotion.user_limit,
    updated_at: promotion.updated_at,
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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await authAxios.patch(
        `${promotionAPI.url}/admin/promotion/${promotion.id}/update`,
        {
          code: adminPromotionInput.code,
          discount_type: adminPromotionInput.discount_type,
          discount_value: adminPromotionInput.discount_value,
          start_date: adminPromotionInput.start_date,
          end_date: adminPromotionInput.end_date,
          usage_limit: adminPromotionInput.usage_limit,
          min_order_value: adminPromotionInput.min_order_value,
          user_limit: adminPromotionInput.user_limit,
          updated_at: new Date(),
        }
      );

      toast.success("[Admin] Promotion updated successfully");

      toggleEditing();
      refetchPromotion();
    } catch (error) {
      toast.error("[Admin] Error updating promotion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    toggleEditing();
    setAdminPromotionInput({
      code: promotion.code,
      discount_type: promotion.discount_type,
      discount_value: promotion.discount_value,
      start_date: promotion.start_date,
      end_date: promotion.end_date,
      usage_limit: promotion.usage_limit,
      min_order_value: promotion.min_order_value,
      user_limit: promotion.user_limit,
      updated_at: promotion.updated_at,
    });
  };

  return (
    <div className="w-8/12 flex flex-row gap-4">
      <div className="flex-1 ">
        <p className="text-lg">Promotion Code: {promotion.code}</p>
        <p className="text-lg">
          Created at: {new Date(promotion.created_at).toLocaleDateString()}
        </p>
        <p className="text-lg">Promotion Type: {promotion.discount_type}</p>
        <p className="text-lg">Promotion Value: {promotion.discount_value}</p>
        <p className="text-lg">
          Promotion Effect:{" "}
          {promotion.discount_type === "fixed"
            ? `Minus $${promotion.discount_value} off of product price`
            : `${promotion.discount_value}% off of product`}
        </p>
        <p className="italic text-gray-600">
          If the product price is $200, the price will be $
          {promotion.discount_type === "fixed"
            ? 200 - promotion.discount_value
            : (200 * (100 - promotion.discount_value)) / 100}{" "}
          after applying the promo-code.
        </p>
        <p className="text-lg">
          Promotion Effective Date: From{" "}
          {new Date(promotion.start_date).toLocaleDateString()} to{" "}
          {new Date(promotion.end_date).toLocaleDateString()}
        </p>
        <p className="text-lg">
          Minial Order Value: {promotion.min_order_value}
        </p>
        <p className="text-lg">Usage Limit: {promotion.usage_limit}</p>
        <p className="text-lg">
          User Limit: {promotion.user_limit} Times for each user
        </p>
        <p className="italic text-gray-600">
          Last updated at: {new Date(promotion.updated_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex-1">
        <div className="flex gap-2 items-center justify-end">
          <button
            title="Edit Promotion Code"
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
        <div className="mt-4">
          <label className="block font-semibold text-lg">Promotion Code</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Code"
            type="text"
            name="code"
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
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
            disabled={isLoading || !isEditing}
            value={adminPromotionInput.user_limit}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPromotionDataInfo;
