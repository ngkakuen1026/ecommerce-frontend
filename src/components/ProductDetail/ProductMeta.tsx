import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import type { UserType } from "../../types/user";
import { Star } from "lucide-react";

interface ProductMetaProps {
  product: Product;
  user: UserType | null;
  averageRating: number; // New prop for average rating
}

const ProductMeta = ({
  product,
  user,
  averageRating, // Destructure the average rating
}: ProductMetaProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold">{product.title}</h1>

      <div className="text-base font-light">
        Posted at:{" "}
        <span className="italic">
          {new Date(product.created_at).toLocaleDateString("en-GB")}{" "}
          {new Date(product.created_at).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="flex items-center gap-2 text-orange-500 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.round(averageRating)
                ? "fill-orange-500"
                : "stroke-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-black font-semibold">
          {averageRating.toFixed(1)} out of 5
        </span>
      </div>

      <div className="flex items-center gap-x-2">
        <h1 className="text-lg font-light">Uploaded by</h1>
        <Link
          to={`/user/${user?.username}`}
          className="hover:opacity-50 flex items-center gap-2"
        >
          <img
            src={user?.profile_image ?? "/default-avatar.png"}
            alt="user profile"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
          />
          <span className="text-lg">{user?.username}</span>
        </Link>
      </div>

      <p className="text-2xl leading-relaxed text-gray-800 mt-4">
        {product.description}
      </p>

      <div className="text-2xl font-semibold text-gray-900">
        ${product.price}
      </div>
    </>
  );
};

export default ProductMeta;
