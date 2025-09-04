import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import authAxios from "../services/authAxios";
import { cartAPI } from "../services/http-api";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const fetchCart = async () => {
    try {
      const response = await authAxios.get(`${cartAPI.url}/me`);
      if (response.data.cart) {
        setCart(response.data.cart);
        const initialQuantities = response.data.cart.reduce(
          (acc: { [key: number]: number }, item: CartItem) => {
            acc[item.product_id] = item.quantity;
            return acc;
          },
          {}
        );
        setQuantities(initialQuantities);
      } else {
        setCart([]);
        setQuantities({});
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
      setQuantities({});
    }
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCart();
    };

    fetchCart();

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  const removeFromCart = async (productId: number) => {
    try {
      await authAxios.delete(`${cartAPI.url}/delete/${productId}`);
      toast.success("Item removed from shopping cart!");
      fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Failed to remove from cart:", err);
      toast.error("Failed to remove item from cart.");
    }
  };

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => {
      const newQuantity = (prev[productId] || 1) + change;
      return { ...prev, [productId]: Math.max(1, Math.min(newQuantity, 20)) };
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount === 0 ? item.price : item.discountedPrice;
      return total + price * (quantities[item.product_id] || 1);
    }, 0);
  };

  const subTotal = calculateSubtotal().toFixed(2);
  const shippingPrice = 0;
  const tax = 0;
  const calculateCartTotal = () => {
    return parseFloat(subTotal + shippingPrice + tax);
  };

  return (
    <div className="px-6 py-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-row gap-8">
          <div className="w-[75%]">
            <h1 className="text-4xl font-semibold mb-4">My Shopping Cart</h1>
            <h2 className="text-lg text-gray-500 mb-4">
              ({cart.length}) {cart.length > 1 ? "items" : "item"} in Your
              Shopping Cart
            </h2>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <img
                  src="../src/assets/empty-cart.png"
                  alt="Empty Cart"
                  className="w-[36rem] h-auto mb-4"
                />
                <p className="text-gray-600 text-lg font-semibold">
                  Your cart is empty.
                </p>
                <p className="text-gray-400 text-center mt-2">
                  Add your favourite items to shopping cart right now!
                </p>
                <Link
                  to="/categories"
                  className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <table className="min-w-full ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left"></th>
                      <th className="py-3 px-4 text-left">Product Image</th>
                      <th className="py-3 px-4 text-left">Product name</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Quantity</th>
                      <th className="py-3 px-4 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cart.map((item: CartItem) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => removeFromCart(item.product_id)}
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
                            <span className="line-through">${item.price}</span>{" "}
                            ${item.discountedPrice}
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border rounded-lg overflow-hidden w-fit">
                            <span className="px-4 mx-4 ">
                              {quantities[item.product_id] || 1}{" "}
                            </span>
                            <div className="flex flex-col">
                              <button
                                className={`px-3 hover:opacity-70`}
                                onClick={() =>
                                  handleQuantityChange(item.product_id, 1)
                                }
                              >
                                ▲
                              </button>
                              <button
                                className={`px-3 hover:opacity-70`}
                                onClick={() =>
                                  handleQuantityChange(item.product_id, -1)
                                }
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          $
                          {(
                            (quantities[item.product_id] || 1) *
                            item.discountedPrice
                          ).toFixed(2)}{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="w-[25%] px-4 bg-cyan-50 rounded-xl border-8 border-cyan-50 ">
            <h1 className="text-4xl font-semibold mb-4">Summary</h1>
            <div className="flex flex-col border-b-[1px] space-y-2 pb-4">
              <div className="flex flex-row justify-between text-lg">
                <h2 className="">
                  Subtotal ({cart.length} {cart.length > 1 ? "items" : "item"})
                </h2>
                <p>${subTotal}</p>
              </div>
              <div className="flex flex-row justify-between text-lg">
                <h2 className="">Shipping</h2>
                <p>${shippingPrice}</p>
              </div>
              <div className="flex flex-row justify-between text-lg">
                <h2 className="">Tax</h2>
                <p>${tax}</p>
              </div>
              <div className="flex flex-row justify-between text-lg">
                <h2 className="">Promo Code</h2>
                <p>-$0</p>
              </div>
            </div>
            <div className="flex flex-row justify-between text-lg pt-4">
              <h2 className="">Cart Total:</h2>
              <p>${calculateCartTotal().toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
