import { useEffect, useState, useRef } from "react";
import {
  Bell,
  User,
  ShoppingCart,
  Heart,
  LogOut,
  UserPen,
  ChartBarIncreasing,
  CirclePlus,
  MoveUpRight,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { WishlistItem } from "../types/wishlist";
import authAxios from "../services/authAxios";
import { cartAPI, wishlistAPI } from "../services/http-api";
import { toast } from "react-toastify";
import type { cartItem } from "../types/cart";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<cartItem[]>([]);

  useEffect(() => {
    const fetchWishlist = () => {
      if (isLoggedIn) {
        authAxios
          .get(`${wishlistAPI.url}/me`)
          .then((res) => {
            if (res.data.wishlist) {
              setWishlist(res.data.wishlist);
            } else {
              setWishlist([]);
            }
          })
          .catch(() => setWishlist([]));
      } else {
        setWishlist([]);
      }
    };

    const fetchCart = () => {
      if (isLoggedIn) {
        authAxios
          .get(`${cartAPI.url}/me`)
          .then((res) => {
            if (res.data.cart) {
              setCart(res.data.cart); // Set cart data
            } else {
              setCart([]);
            }
          })
          .catch(() => setCart([]));
      } else {
        setCart([]);
      }
    };

    fetchWishlist();
    fetchCart();

    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, [isLoggedIn]);

  // Hide dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        wishlistRef.current &&
        !wishlistRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
        setShowWishlist(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeFromWishlist = async (productId: number) => {
    try {
      await authAxios.delete(`${wishlistAPI.url}/delete/${productId}`);
      setWishlist((prev) =>
        prev.filter((item) => item.product_id !== productId)
      );
      toast.success("Item removed from wishlist!");
      window.dispatchEvent(new Event("wishlist-updated"));
    } catch (err) {
      console.error("Error removing item from wishlist:", err);
      toast.error("Error removing item from wishlist.");
    }
  };

  return (
    <nav className="bg-gray-50 shadow-md px-6 py-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-10">
        {/* Logo */}
        <div className="flex-none">
          <Link to="/" className="text-3xl font-bold text-blue-500">
            Shoporia
          </Link>
        </div>

        {/* Left-side nav */}
        <div className="hidden lg:flex flex-1 gap-10">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "FAQ", path: "/faq" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-xl text-gray-800 hover:text-blue-600 hover:opacity-70 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center gap-6">
          <Link
            to="/notification"
            className="flex items-center justify-center text-gray-700 hover:text-blue-600"
          >
            <Bell className="w-8 h-8" />
          </Link>
          <div className="relative" ref={wishlistRef}>
            <button
              onClick={() => {
                setShowWishlist((prev) => !prev);
                setShowMenu(false);
              }}
              className="flex items-center justify-center text-gray-700 hover:text-blue-600 focus:outline-none relative"
            >
              <Heart className="w-8 h-8" />
              {isLoggedIn && wishlist.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5"
                  style={{ minWidth: "1.5rem", textAlign: "center" }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>
            {showWishlist && isLoggedIn && (
              <div className="absolute right-0 top-full mt-2 w-full md:w-96 bg-white border border-gray-200 rounded-md shadow-lg z-50 m-4">
                <div className="bg-gray-100 p-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Your Wishlist
                    </h2>
                    <h3 className="text-gray-500">
                      ({wishlist.length}){" "}
                      {wishlist.length > 1 ? "items" : "item"}{" "}
                    </h3>
                  </div>

                  <h3
                    className="py-2 rounded transition flex items-center gap-2 cursor-pointer hover:opacity-50"
                    onClick={() => {
                      setShowWishlist(false);
                      navigate("/wishlist");
                    }}
                  >
                    View More
                    <MoveUpRight size={16} />
                  </h3>
                </div>
                <div className="p-4">
                  {wishlist.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                      Your wishlist is empty.
                    </p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {wishlist.slice(0, 5).map((item) => (
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
                              onClick={() => setShowWishlist(false)}
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

                            <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition w-full">
                              Add to Cart
                            </button>
                          </div>

                          <X
                            size={16}
                            className="hover:opacity-50 cursor-pointer"
                            onClick={() => removeFromWishlist(item.product_id)}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => {
                setShowCart((prev) => !prev);
                setShowWishlist(false); // Close wishlist dropdown
                setShowMenu(false); // Close user menu
              }}
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
                    <h2 className="text-lg font-semibold text-gray-700">
                      Your Cart
                    </h2>
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
                          </div>

                          <X
                            size={16}
                            className="hover:opacity-50 cursor-pointer"
                            onClick={() => {
                              /* Add remove from cart function if needed */
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Avatar Dropdown */}
          {isLoggedIn ? (
            <div className="relative flex items-center" ref={menuRef}>
              <button
                onClick={() => {
                  setShowMenu((prev) => !prev);
                  setShowWishlist(false);
                }}
                className="flex items-center justify-center focus:outline-none"
              >
                <img
                  src={
                    user?.profile_image
                      ? user.profile_image
                      : "https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-blue-500 object-cover md:hover:opacity-50"
                />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 space-y-2">
                  <div className="flex gap-4 mb-2">
                    {user?.profile_image ? (
                      <img
                        src={user?.profile_image ?? "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-14 h-14 rounded-full border object-cover md:hover:opacity-50"
                      />
                    ) : (
                      <img
                        src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <p className="text-gray-700 font-medium text-base">
                        {user?.first_name}, {user?.last_name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Welcome back,{" "}
                    <span className="font-semibold text-gray-800 hover:opacity-50">
                      <Link to={`/user/${user?.username}`}>
                        {user?.username}
                      </Link>
                    </span>
                  </p>
                  {/* Mobile-only nav links */}
                  <div className="flex flex-col lg:hidden border-t pt-2 space-y-1">
                    {[
                      { label: "Home", path: "/" },
                      { label: "About", path: "/about" },
                      { label: "Contact", path: "/contact" },
                      { label: "FAQ", path: "/faq" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setShowMenu(false)}
                        className="text-gray-700 hover:text-blue-600 px-2 py-1 rounded hover:bg-gray-100 transition flex items-center"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t pt-2 space-y-1">
                    <Link
                      to="/dashboard/overview"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                    >
                      <ChartBarIncreasing className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/add-product"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                    >
                      <CirclePlus className="w-4 h-4" />
                      <span>Add Product</span>
                    </Link>
                    <Link
                      to="/user/myprofile"
                      onClick={() => setShowMenu(false)}
                      className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                    >
                      <UserPen className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </Link>
                    {user?.is_admin === true && (
                      <Link
                        to="/admin-panel/overview"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-2 px-2 py-2 text-gray-800 hover:bg-gray-100 rounded transition"
                      >
                        <UserPen className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                  </div>

                  <div className="border-t pt-2 space-y-1">
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                      className="flex items-center gap-2 w-full px-2 py-2 text-red-600 hover:bg-gray-100 rounded transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center focus:outline-none"
            >
              <User className="w-8 h-8 text-gray-700 hover:text-blue-600" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
