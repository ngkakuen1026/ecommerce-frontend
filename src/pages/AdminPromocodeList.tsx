import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";
import { promotionAPI } from "../services/http-api";
import { toast } from "react-toastify";
import type { PromotionType } from "../types/promotion";
import AdminPromocodeControl from "../components/AdminPanel/AdminPromocode/AdminPromocodeControl";
import AdminPromocodeTable from "../components/AdminPanel/AdminPromocode/AdminPromocodeTable";

const AdminPromocodeList = () => {
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [promotionsPerPage, setPromotionsPerPage] = useState(25);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPromotionCodes = async () => {
    let active = true;
    setSearching(true);

    try {
      let res;
      if (searchQuery.trim() === "") {
        res = await authAxios.get(`${promotionAPI.url}/admin/all-promotions`);
      } else {
        res = await authAxios.get(
          `${
            promotionAPI.url
          }/admin/all-promotions/search?query=${encodeURIComponent(
            searchQuery
          )}`
        );
      }
      if (active) {
        setPromotions(res.data.promotions);
        setCurrentPage(1);
      }
      console.log(res.data.promotions)
    } catch (error) {
      console.error("[Admin] Error fetching promotions data", error);
      if (active) setPromotions([]);
    } finally {
      setIsLoading(false);
      if (active) setSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchPromotionCodes, 400);
    fetchPromotionCodes();

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const sortedPromotions = [...promotions];
  switch (sortOption) {
    case "des":
      sortedPromotions.sort((a, b) => b.id - a.id);
      break;
    case "asc":
      sortedPromotions.sort((a, b) => a.id - b.id);
      break;
    case "alpasc":
      sortedPromotions.sort((a, b) =>
        a.code.toLowerCase().localeCompare(b.code.toLowerCase())
      );
      break;
    case "alpdes":
      sortedPromotions.sort((a, b) =>
        b.code.toLowerCase().localeCompare(a.code.toLowerCase())
      );
      break;
    case "newest":
      sortedPromotions.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case "oldest":
      sortedPromotions.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    default:
      break;
  }

  // Pagination
  const indexOfLastPromotion = currentPage * promotionsPerPage;
  const indexOfFirstPromotion = indexOfLastPromotion - promotionsPerPage;
  const currentPromotions = sortedPromotions.slice(
    indexOfFirstPromotion,
    indexOfLastPromotion
  );
  const totalPages = Math.ceil(sortedPromotions.length / promotionsPerPage);

  const deletePromotion = async (promoId: number) => {
    try {
      const repsonse = await authAxios.delete(
        `${promotionAPI.url}/admin/promotion/${promoId}/delete`
      );
      toast.success(`[Admin] Promotion deleted successfully`);
      console.log("[Admin] Promotion deleted successfully", repsonse.data);
    } catch (error) {
      console.error("[Admin] Error deleting promotion", error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold mb-4">All Promotion Codes</h1>
      <h2 className="text-xl text-gray-500 mb-4">
        This is the admin panel where you can manage all promotion code. You can
        create a new promotion code, view their details, edit their information,
        and delete it if necessary.
      </h2>
      <AdminPromocodeControl
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        promotionsPerPage={promotionsPerPage}
        setPromotionsPerPage={setPromotionsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        searching={searching}
      />

      <AdminPromocodeTable
        promotions={currentPromotions}
        setPromotions={setPromotions}
        deletePromotion={deletePromotion}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminPromocodeList;
