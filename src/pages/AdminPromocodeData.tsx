import { useEffect, useState } from "react";
import type { PromotionType } from "../types/promotion";
import Spinner from "../components/Reuseable/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import authAxios from "../services/authAxios";
import { promotionAPI } from "../services/http-api";
import AdminPromotionDataBreadCrumb from "../components/AdminPanel/AdminPromocode/AdminPromocodeData/AdminPromotionDataBreadCrumb";
import AdminPromotionDataInfo from "../components/AdminPanel/AdminPromocode/AdminPromocodeData/AdminPromotionDataInfo";
import AdminPromocodeUsage from "./AdminPromocodeUsage";

const AdminPromocodeData = () => {
  const { id } = useParams<{ id: string }>();
  const [promotion, setPromotion] = useState<PromotionType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const fetchPromotionCode = async () => {
    try {
      const response = await authAxios.get(
        `${promotionAPI.url}/admin/all-promotions/promotion/${id}`
      );
      console.log("[Admin] Category data fetched successfully", response.data);
      setPromotion(response.data.promotion);
    } catch (error) {
      console.error("[Admin] Error fetching promotion data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotionCode();
  }, [id]);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      {isLoading ? (
        <Spinner />
      ) : promotion ? (
        <div>
          <h1 className="text-4xl font-semibold mb-4">
            Details for Promotion Code "{promotion.code}"
          </h1>

          <AdminPromotionDataBreadCrumb promotion={promotion} onBack={onBack} />

          <div className="flex flex-row gap-4">
            <AdminPromotionDataInfo
              promotion={promotion}
              isEditing={isEditing}
              toggleEditing={toggleEditing}
              refetchPromotion={fetchPromotionCode}
            />

            <AdminPromocodeUsage promotionId={promotion.id} />
          </div>
        </div>
      ) : (
        <p>Promotion Not found.</p>
      )}
    </div>
  );
};

export default AdminPromocodeData;
