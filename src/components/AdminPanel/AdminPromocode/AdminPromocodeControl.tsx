import { Link } from "react-router-dom";
import Spinner from "../../Reuseable/Spinner";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AdminPromocodeControlProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  promotionsPerPage: number;
  setPromotionsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalPages: number;
  searching: boolean;
}

const AdminPromocodeControl = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  promotionsPerPage,
  setPromotionsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  searching,
}: AdminPromocodeControlProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-2 py-2 text-sm w-full md:w-96"
        />
        {searching && (
          <span className=" text-gray-500 ml-2 flex items-center gap-2">
            Searching... <Spinner />
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
          Sort:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">Sort by…</option>
          <option value="asc">Product ID (ascending)</option>
          <option value="des">Product ID (descending)</option>
          <option value="alpasc">Alphabet(ascending)</option>
          <option value="alpdes">Alphabet(descending)</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <label htmlFor="perPage" className="text-sm text-gray-600 ml-2">
          Show:
        </label>
        <select
          id="perPage"
          value={promotionsPerPage}
          onChange={(e) => {
            setPromotionsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border text-sm disabled:opacity-50 hover:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
        <Link
          to="add-promo-code"
          className="border rounded px-2 py-1 hover:opacity-70 bg-blue-500 text-white"
        >
          Add New Promo Code
        </Link>
      </div>
    </div>
  );
};

export default AdminPromocodeControl;
