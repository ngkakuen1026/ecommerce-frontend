import { Link } from "react-router-dom";
import type { Categories } from "../../../../types/category";

interface AdminCategoryDataBreadcrumbProps {
  category: Categories;
  onBack: () => void;
}

const AdminCategoryDataBreadcrumb = ({
  category,
  onBack,
}: AdminCategoryDataBreadcrumbProps) => {
  return (
    <div className="flex justify-between gap-2 mb-8 text-gray-500">
      <p>
        <Link to="/admin-panel/all-categories" className="hover:opacity-70">
          All Categories
        </Link>{" "}
        &gt;{" "}
        <span className="text-black font-semibold">
          {category.name} {" "}
          (Category ID: {category.id})
        </span>{" "}
        &gt; Update Category Details
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

export default AdminCategoryDataBreadcrumb;
