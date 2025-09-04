import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";
import { cartAPI, wishlistAPI } from "../services/http-api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import type { WishlistItem } from "../types/wishlist";
import type { CartItem } from "../types/cart";
import { X } from "lucide-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);

  const fetchWishlist = async () => {
    try {
      const response = await authAxios.get(`${wishlistAPI.url}/me`);
      if (response.data.wishlist) {
        setWishlist(response.data.wishlist);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await authAxios.get(`${cartAPI.url}/me`);
      if (response.data.cart) {
        setCartItems(
          response.data.cart.map((item: CartItem) => item.product_id)
        );
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    fetchWishlist();
    fetchCartItems();

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  const removeFromWishlist = async (productId: number) => {
    try {
      await authAxios.delete(`${wishlistAPI.url}/delete/${productId}`);
      toast.success("Item removed from wishlist!");
      fetchWishlist();
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      toast.error("Failed to remove item from wishlist.");
    }
  };

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => {
      const newQuantity = (prev[productId] || 1) + change;
      return { ...prev, [productId]: Math.max(1, Math.min(newQuantity, 20)) };
    });
  };

  const addToCart = async (productId: number) => {
    const quantity = quantities[productId] || 1;
    try {
      await authAxios.post(`${cartAPI.url}/create`, {
        productId,
        quantity,
      });
      toast.success("Item added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
      fetchCartItems();
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <div className="px-6 py-10">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">My Wishlist</h1>
        <h2 className="text-lg text-gray-500 mb-4">
          ({wishlist.length}) {wishlist.length > 1 ? "items" : "item"} in Your
          wishlist
        </h2>
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6">
            <img
              src="../src/assets/empty-wishlist.png"
              alt="Empty Wishlist"
              className="w-[48rem] h-auto mb-4"
            />
            <p className="text-gray-600 text-lg font-semibold">
              Your wishlist is empty.
            </p>
            <p className="text-gray-400 text-center mt-2">
              Add items to your wishlist to keep track of your favorites!
            </p>
            <Link
              to="/categories"
              className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <table className="min-w-full ">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left"></th>
                <th className="py-3 px-4 text-left">Product Image</th>
                <th className="py-3 px-4 text-left">Product name</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock status</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {wishlist.map((item: WishlistItem) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => removeFromWishlist(item.product_id)}
                      className="px-4 py-2 hover:opacity-70"
                    >
                      <X size={16} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={
                        item.image_url
                          ? item.image_url
                          : "https://static.audison.com/media/2022/10/no-product-image.png"
                      }
                      alt={item.title}
                      className="w-48 h-48 object-cover mr-4 border border-gray-300 rounded-lg p-1"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/product/${item.product_id}`}
                      className="hover:underline"
                    >
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </td>
                  {item.discount === 0 ? (
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      ${item.price}
                    </td>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <span className="line-through">${item.price}</span> $
                      {item.discountedPrice}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status ? item.status.toUpperCase() : "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                      <span className="px-4 mx-4 ">
                        {quantities[item.product_id] || 1}
                      </span>
                      <div className="flex flex-col">
                        <button
                          className={`px-3 hover:opacity-70 ${
                            cartItems.includes(item.product_id)
                              ? "cursor-not-allowed"
                              : "cursor-pointer hover:opacity-70"
                          }`}
                          onClick={() =>
                            handleQuantityChange(item.product_id, 1)
                          }
                          disabled={cartItems.includes(item.product_id)}
                        >
                          ▲
                        </button>
                        <button
                          className={`px-3 hover:opacity-70 ${
                            cartItems.includes(item.product_id)
                              ? "cursor-not-allowed"
                              : "cursor-pointer hover:opacity-70"
                          }`}
                          onClick={() =>
                            handleQuantityChange(item.product_id, -1)
                          }
                          disabled={cartItems.includes(item.product_id)}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => addToCart(item.product_id)}
                      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ${
                        cartItems.includes(item.product_id)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={cartItems.includes(item.product_id)}
                    >
                      {cartItems.includes(item.product_id)
                        ? "Already in the cart"
                        : "Add to Cart"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
