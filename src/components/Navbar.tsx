import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import type { WishlistItem } from "../types/wishlist";
import authAxios from "../services/authAxios";
import { cartAPI, wishlistAPI } from "../services/http-api";
import { toast } from "react-toastify";
import type { CartItem } from "../types/cart";
import NavLogo from "./Navbar/NavLogo";
import NavLinks from "./Navbar/NavLinks";
import NavIcons from "./Navbar/NavIcons";

const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartRef = useRef<HTMLDivElement>(null);

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
              setCart(res.data.cart);
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

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        wishlistRef.current &&
        !wishlistRef.current.contains(e.target as Node) &&
        cartRef.current &&
        !cartRef.current.contains(e.target as Node)
      ) {
        setShowMenu(false);
        setShowWishlist(false);
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleWishlist = () => {
    setShowWishlist((prev) => {
      const newState = !prev;
      if (newState) {
        setShowCart(false);
        setShowMenu(false);
      }
      return newState;
    });
  };

  const toggleCart = () => {
    setShowCart((prev) => {
      const newState = !prev;
      if (newState) {
        setShowWishlist(false);
        setShowMenu(false);
      }
      return newState;
    });
  };

  const toggleMenu = () => {
    setShowMenu((prev) => {
      const newState = !prev;
      if (newState) {
        setShowWishlist(false);
        setShowCart(false);
      }
      return newState;
    });
  };

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

  const removeFromCart = async (productId: number) => {
    try {
      await authAxios.delete(`${cartAPI.url}/delete/${productId}`);
      setCart((prev) => prev.filter((item) => item.product_id !== productId));
      toast.success("Item removed from cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (err) {
      console.error("Error removing item from cart:", err);
      toast.error("Error removing item from cart.");
    }
  };

  return (
    <nav className="bg-gray-50 shadow-md px-12 py-4">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-10">
        <NavLogo />
        <NavLinks />
        <NavIcons
          wishlist={wishlist}
          isLoggedIn={isLoggedIn}
          cart={cart}
          removeFromWishlist={removeFromWishlist}
          removeFromCart={removeFromCart}
          wishlistRef={wishlistRef}
          cartRef={cartRef}
          menuRef={menuRef}
          toggleWishlist={toggleWishlist}
          toggleCart={toggleCart}
          toggleMenu={toggleMenu}
          showWishlist={showWishlist}
          showCart={showCart}
          showMenu={showMenu}
          setShowWishlist={setShowWishlist}
          setShowCart={setShowCart}
          user={user}
          logout={logout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
