import { MoveUpRight, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { CartItem } from "../../../types/cart";
import type { RefObject } from "react";

interface CartMenuProps {
  isLoggedIn: boolean;
  cart: CartItem[];
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  removeFromCart: (productId: number) => void;
  cartRef: RefObject<HTMLDivElement | null>;
  toggleCart: () => void;
}

const CartMenu: React.FC<CartMenuProps> = ({
  cart,
  isLoggedIn,
  showCart,
  setShowCart,
  removeFromCart,
  cartRef,
  toggleCart,
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={toggleCart}
        className="flex items-center justify-center text-gray-700 hover:text-blue-600"
      >
        <ShoppingCart className="w-8 h-8" />
        {isLoggedIn && cart.length > 0 && (
          <span
            className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5"
            style={{ minWidth: "1.5rem", textAlign: "center" }}
          >
            {cart.length}
          </span>
        )}
      </button>
      {showCart && isLoggedIn && (
        <div className="absolute right-0 top-full mt-2 w-full md:w-96 bg-white border border-gray-200 rounded-md shadow-lg z-50 m-4">
          <div className="bg-gray-100 p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-700">Shopping Cart</h2>
              <h3 className="text-gray-500">
                ({cart.length}) {cart.length > 1 ? "items" : "item"}{" "}
              </h3>
            </div>

            <h3
              className="py-2 rounded transition flex items-center gap-2 cursor-pointer hover:opacity-50"
              onClick={() => {
                setShowCart(false);
                navigate("/cart");
              }}
            >
              View More
              <MoveUpRight size={16} />
            </h3>
          </div>
          <div className="p-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {cart.slice(0, 5).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 py-2 hover:bg-gray-50 transition cursor-pointer"
                  >
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-24 h-24 md:w-36 md:h-36 object-cover rounded border"
                      />
                    ) : (
                      <img
                        src="https://commercial.bunn.com/img/image-not-available.png"
                        alt={item.title}
                        className="w-24 h-24 md:w-36 md:h-36 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1 flex flex-col justify-between">
                      <Link
                        to={`/product/${item.product_id}`}
                        className="text-gray-800 font-medium hover:underline"
                        onClick={() => setShowCart(false)}
                      >
                        {item.title}
                      </Link>
                      <div>
                        {item.discount == 0 ? (
                          <div className="text-md text-gray-500">
                            <p> ${item.price}</p>
                          </div>
                        ) : (
                          <div className="flex gap-2 ">
                            <p className="text-md text-gray-500 line-through">
                              ${item.price}
                            </p>
                            <p className="text-md text-gray-500">
                              ${item.discountedPrice}
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600">
                        Quantity:{" "}
                        <span className="italic">{item.quantity}</span>
                      </p>
                    </div>

                    <X
                      size={16}
                      className="hover:opacity-50 cursor-pointer"
                      onClick={() => removeFromCart(item.product_id)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartMenu;
