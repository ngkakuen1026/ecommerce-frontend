import { Link } from "react-router-dom";
import type { Categories } from "../../types/category";

interface Props {
  category: Categories | null;
  productTitle: string;
  onBack: () => void;
}

const ProductBreadcrumb = ({ category, productTitle, onBack }: Props) => {
  return (
    <div className="flex justify-between gap-2">
      <p className="text-gray-500 items-center">
        <Link to="/categories" className="hover:opacity-50">
          Categories
        </Link>{" "}
        &gt;{" "}
        <Link
          to={`/categories?name=${encodeURIComponent(category?.name || "")}`}
          className="hover:opacity-50"
        >
          {category?.name}
        </Link>{" "}
        &gt;{" "}
        <span className="text-black font-medium">{productTitle}</span>
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

export default ProductBreadcrumb;