import React from "react";
import type { PromotionType } from "../../../../types/promotion";
import { Link } from "react-router-dom";

interface AdminPromotionDataBreadCrumbProps {
  promotion: PromotionType;
  onBack: () => void;
}

const AdminPromotionDataBreadCrumb = ({
  promotion,
  onBack,
}: AdminPromotionDataBreadCrumbProps) => {
  return (
    <div className="flex justify-between gap-2 mb-8 text-gray-500">
      <p>
        <Link to="/admin-panel/all-promo-codes" className="hover:opacity-70">
          All Promotions Codes
        </Link>{" "}
        &gt;{" "}
        <span className="text-black font-semibold">
          {promotion.code} (Promotion Code ID: {promotion.id})
        </span>{" "}
        &gt; Update Promotion Details
      </p>
      <button
        onClick={onBack}
        className="text-gray-500 cursor-pointer hover:underline"
      >
        Back
      </button>
    </div>
  );
};

export default AdminPromotionDataBreadCrumb;
