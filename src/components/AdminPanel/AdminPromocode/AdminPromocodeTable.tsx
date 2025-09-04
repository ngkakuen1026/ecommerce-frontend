import React from "react";
import type { PromotionType } from "../../../types/promotion";
import Spinner from "../../Reuseable/Spinner";
import { Link } from "react-router-dom";

interface AdminPromocodeTableProps {
  promotions: PromotionType[];
  setPromotions: React.Dispatch<React.SetStateAction<PromotionType[]>>;
  deletePromotion: (promoId: number) => void;
  isLoading: boolean;
}

const AdminPromocodeTable = ({
  promotions,
  setPromotions,
  deletePromotion,
  isLoading,
}: AdminPromocodeTableProps) => {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : promotions.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Promo Code</th>
              <th className="py-3 px-4">Discounted Type and Value</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Maximum Uses</th>
              <th className="py-3 px-4">Effective From</th>
              <th className="py-3 px-4">Effective Until</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion: PromotionType) => (
              <tr key={promotion.id} className="border-b text-center">
                <td className="py-3 px-4">{promotion.id}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`promotion/${promotion.id}`}
                    className="hover:underline hover:opacity-70"
                  >
                    {promotion.code}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <p>{promotion.discount_type}</p>
                  <p>
                    {promotion.discount_type === "fixed"
                      ? `$${promotion.discount_value} off product price`
                      : `${promotion.discount_value}% off products`}
                  </p>
                </td>
                <td className="py-3 px-4">Active</td>
                <td className="py-3 px-4">
                  {promotion.usage_limit || "Unlimited"}
                </td>
                <td className="py-3 px-4">
                  {new Date(promotion.start_date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {new Date(promotion.end_date).toLocaleDateString() || "N/A"}
                </td>

                <td className="py-3 px-4">
                  <button
                    className="text-red-500 hover:underline ml-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        deletePromotion(promotion.id);
                        setPromotions((prev) =>
                          prev.filter(
                            (p: PromotionType) => p.id !== promotion.id
                          )
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No promotions found.</p>
      )}
    </div>
  );
};

export default AdminPromocodeTable;
