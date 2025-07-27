import { Heart, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import authAxios from "../../services/authAxios";
import { wishlistAPI } from "../../services/http-api";
import type { Product } from "../../types/product";
import type { WishlistItem } from "../../types/wishlist";

interface Props {
  product: Product;
  wishlist: WishlistItem[];
}

const ProductActions: React.FC<Props> = ({ product, wishlist }) => {
  const isWishlisted =
    Array.isArray(wishlist) &&
    wishlist.some((item) => item.product_id === product.id);
  const [loading, setLoading] = useState(false);

  const addToWishlist = async () => {
    setLoading(true);
    try {
      console.log("Adding to wishlist:", { productId: product.id });
      await authAxios.post(`${wishlistAPI.url}/create`, {
        productId: product.id,
      });
      toast.success("Item added to wishlist!");
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      toast.error("Failed to add item to wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async () => {
    setLoading(true);
    try {
      await authAxios.delete(`${wishlistAPI.url}/delete/${product.id}`);
      toast.success("Item removed from wishlist!");
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item from wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow ${
          isWishlisted
            ? "bg-gray-200 text-rose-600 hover:bg-gray-300"
            : "bg-rose-600 text-white hover:bg-rose-700"
        }`}
        onClick={isWishlisted ? removeFromWishlist : addToWishlist}
        disabled={loading}
      >
        <Heart
          className="w-5 h-5"
          fill={isWishlisted ? "red" : "none"}
          color={isWishlisted ? "red" : "white"}
        />
        {isWishlisted ? "Already in Wishlist" : "Add to Wishlist"}
      </button>
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow">
        <ShoppingBasket className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductActions;
