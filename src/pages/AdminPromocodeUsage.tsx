import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";
import { promotionAPI } from "../services/http-api";
import type { PromotionUsageType } from "../types/promotion";

interface AdminPromocodeUsageProps {
  promotionId: number;
}

const AdminPromocodeUsage = ({ promotionId }: AdminPromocodeUsageProps) => {
  const [usageData, setUsageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsageData = async () => {
    try {
      const response = await authAxios.get(
        `${promotionAPI.url}/admin/promotion-usage/${promotionId}`
      );
      setUsageData(response.data.usage);
    } catch (error) {
      console.error("[Admin] Error fetching promo code usage data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, [promotionId]);

  return (
    <div className="flex-1 border p-4 rounded">
      <h2 className="text-2xl font-semibold mb-4">Promo Code Usage</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Total Uses: {usageData.length}</p>
          <p>
            Unique Users: {new Set(usageData.map((use: PromotionUsageType) => use.user_id)).size}
          </p>
          <table className="min-w-full mt-4 border">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">User ID</th>
                <th className="border p-2">Order ID</th>
              </tr>
            </thead>
            <tbody>
              {usageData.map((use: PromotionUsageType) => (
                <tr key={use.id}>
                  <td className="border p-2">
                    {new Date(use.used_at).toLocaleString()}
                  </td>
                  <td className="border p-2">{use.user_id}</td>
                  <td className="border p-2">{use.order_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPromocodeUsage;
