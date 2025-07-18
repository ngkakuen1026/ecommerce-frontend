import React from "react";
import type { Categories } from "../../types/category";
import { Search } from "lucide-react";
import PriceRangeFilter from "./PriceRangeFliter";

interface Props {
  categories: Categories[];
  selectedCategory: Categories | null;
  searchQuery: string;
  tempMinPrice: number;
  tempMaxPrice: number;
  setSearchQuery: (val: string) => void;
  handleSearch: () => void;
  handleCategoryClick: (category: Categories) => void;
  setTempMinPrice: (val: number) => void;
  setTempMaxPrice: (val: number) => void;
  applyPriceFilter: () => void;
}

const CategorySidebar: React.FC<Props> = ({
  categories,
  selectedCategory,
  searchQuery,
  tempMinPrice,
  tempMaxPrice,
  setSearchQuery,
  handleSearch,
  handleCategoryClick,
  setTempMinPrice,
  setTempMaxPrice,
  applyPriceFilter,
}) => {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm sm:text-base"
        />
        <Search
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-600 cursor-pointer"
        />
      </div>

      {/* Category List */}
      <div>
        <h1 className="text-xl font-semibold mb-2 border-b pb-1">
          Browse by Category:
        </h1>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryClick(category)}
                className={`text-left w-full sm:text-lg text-base px-2 py-1 rounded transition ${
                  selectedCategory?.id === category.id
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <PriceRangeFilter
        tempMin={tempMinPrice}
        tempMax={tempMaxPrice}
        onTempMinChange={setTempMinPrice}
        onTempMaxChange={setTempMaxPrice}
        onApply={applyPriceFilter}
      />
    </div>
  );
};

export default CategorySidebar;
