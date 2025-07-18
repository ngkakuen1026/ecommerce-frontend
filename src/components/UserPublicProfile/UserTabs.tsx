import React from "react";

interface UserTabsProps {
  activeTab: "products" | "comments";
  onChangeTab: (tab: "products" | "comments") => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ activeTab, onChangeTab }) => {
  return (
    <div className="border-b border-gray-300 mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
      <button
        onClick={() => onChangeTab("products")}
        className={`pb-2 font-semibold transition-colors border-b-2 ${
          activeTab === "products"
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-400"
        }`}
        role="tab"
        aria-selected={activeTab === "products"}
      >
        Products
      </button>

      <button
        onClick={() => onChangeTab("comments")}
        className={`pb-2 font-semibold transition-colors border-b-2 ${
          activeTab === "comments"
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-400"
        }`}
        role="tab"
        aria-selected={activeTab === "comments"}
      >
        User Comments
      </button>
    </div>
  );
};

export default UserTabs;