import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";
import { wishlistAPI } from "../services/http-api";
import { toast } from "react-toastify";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

type WishlistItem = {
  product_id: number;
  id: number;
  image_url: string;
  title: string;
  price: string; // Changed to string to match API response
  status: string | null; // Use status instead of in_stock
};

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

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

  useEffect(() => {
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    fetchWishlist();

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

  return (
    <div className="px-6 py-10">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <>
            <table className="min-w-full ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left ">Product Image</th>
                  <th className="py-3 px-4 text-left ">Product name</th>
                  <th className="py-3 px-4 text-left ">Price</th>
                  <th className="py-3 px-4 text-left ">Stock status</th>
                  <th className="py-3 px-4 text-left ">Quantity</th>
                  <th className="py-3 px-4 text-left ">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wishlist.map((item) => (
                  <tr key={item.id}>
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
                        <span className="font-semibold">{item.title}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${item.price}
                    </td>
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
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product_id, -1)
                          }
                          className="bg-gray-200 text-gray-700 px-2 rounded-l"
                          disabled={(quantities[item.product_id] || 1) <= 1}
                        >
                          <Minus size={18} />
                        </button>
                        <input
                          type="number"
                          value={quantities[item.product_id] || 1}
                          readOnly
                          className="w-16 border text-center rounded"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product_id, 1)
                          }
                          className="bg-gray-200 text-gray-700 px-2 rounded-r"
                          disabled={(quantities[item.product_id] || 1) >= 20}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeFromWishlist(item.product_id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mr-2"
                      >
                        Remove
                      </button>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
