import { Link } from "react-router-dom";

interface Props {
  productTitle: string;
  onBack: () => void;
}

const ProductImageBreadcrumb = ({ productTitle, onBack }: Props) => {
  return (
    <div className="flex justify-between gap-2 mb-8">
      <p className="text-gray-500 items-center">
        <Link to="/dashboard/products" className="hover:opacity-50">
          All Products
        </Link>{" "}
        &gt; <span className="text-black font-medium">{productTitle}</span> &gt;{" "}
        <span className="text-gray-500 mb-8">Update your product details</span>
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

export default ProductImageBreadcrumb;
