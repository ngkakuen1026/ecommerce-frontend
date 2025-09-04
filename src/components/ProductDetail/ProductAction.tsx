import { Heart, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import authAxios from "../../services/authAxios";
import { cartAPI, wishlistAPI } from "../../services/http-api";
import type { Product } from "../../types/product";
import type { WishlistItem } from "../../types/wishlist";
import type { CartItem } from "../../types/cart";

interface Props {
  product: Product;
  wishlist: WishlistItem[];
  cart: CartItem[];
}

const ProductActions: React.FC<Props> = ({ product, wishlist, cart }) => {
  const isWishlisted =
    Array.isArray(wishlist) &&
    wishlist.some((item) => item.product_id === product.id);
  const isAddedToCart =
    Array.isArray(cart) && cart.some((item) => item.product_id === product.id);

  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const addToWishlist = async () => {
    setLoading(true);
    try {
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

  const addToCart = async () => {
    setLoading(true);
    try {
      await authAxios.post(`${cartAPI.url}/create`, {
        productId: product.id,
        quantity: quantity,
      });
      toast.success("Item added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async () => {
    setLoading(true);
    try {
      await authAxios.delete(`${cartAPI.url}/delete/${product.id}`);
      toast.success("Item removed from cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <div
        className={`flex items-center border rounded-lg overflow-hidden ${isAddedToCart ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span className="px-4 mx-4 ">{quantity}</span>
        <div className="flex flex-col">
          <button
            className={`px-3 hover:opacity-70 ${isAddedToCart ? "cursor-not-allowed" : "cursor-pointer hover:opacity-70"}`}
            onClick={() => setQuantity((prev) => prev + 1)}
            disabled={isAddedToCart}
          >
            ▲
          </button>
          <button
            className={`px-3 hover:opacity-70 ${isAddedToCart ? "cursor-not-allowed" : "cursor-pointer hover:opacity-70"}`}
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            disabled={isAddedToCart}
          >
            ▼
          </button>
        </div>
      </div>

      <button
        className={`px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow ${
          isAddedToCart
            ? "bg-gray-200 text-emerald-600 hover:bg-gray-300"
            : "bg-emerald-600 text-white hover:bg-emerald-700 "
        }`}
        onClick={isAddedToCart ? removeFromCart : addToCart}
        disabled={loading}
      >
        <ShoppingBasket className="w-5 h-5" />
        {isAddedToCart ? "Remove from Cart" : "Add to Cart"}
      </button>
      <button
        className="rounded-full border p-3 shadow"
        onClick={isWishlisted ? removeFromWishlist : addToWishlist}
        disabled={loading}
      >
        <Heart
          fill={isWishlisted ? "red" : "white"}
          color={isWishlisted ? "white" : "red"}
        />
      </button>
    </div>
  );
};

export default ProductActions;
