import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import WishlistMenu from "./WishListMenu/WishListMenu";
import CartMenu from "./CartMenu/CartMenu";
import type { WishlistItem } from "../../types/wishlist";
import type { CartItem } from "../../types/cart";
import type { RefObject } from "react";
import UserMenu from "./UserMenu";
import type { UserType } from "../../types/user";

interface NavIconsProps {
  isLoggedIn: boolean;
  wishlist: WishlistItem[];
  cart: CartItem[];
  removeFromWishlist: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  wishlistRef: RefObject<HTMLDivElement | null>;
  cartRef: RefObject<HTMLDivElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
  toggleWishlist: () => void;
  toggleCart: () => void;
  toggleMenu: () => void;
  showWishlist: boolean;
  showCart: boolean;
  showMenu: boolean;
  setShowWishlist: (value: boolean) => void;
  setShowCart: (value: boolean) => void;
  user: UserType | null;
  logout: () => void;
}
const NavIcons: React.FC<NavIconsProps> = ({
  isLoggedIn,
  wishlist,
  showWishlist,
  setShowWishlist,
  cart,
  showCart,
  setShowCart,
  showMenu,
  removeFromWishlist,
  removeFromCart,
  wishlistRef,
  cartRef,
  menuRef,
  toggleWishlist,
  toggleCart,
  toggleMenu,
  user,
  logout,
}) => {
  return (
    <div className="flex items-center gap-6">
      <Link
        to="/notification"
        className="flex items-center justify-center text-gray-700 hover:text-blue-600"
      >
        <Bell className="w-8 h-8" />
      </Link>
      <WishlistMenu
        isLoggedIn={isLoggedIn}
        wishlist={wishlist}
        cart={cart}
        showWishlist={showWishlist}
        setShowWishlist={setShowWishlist}
        removeFromWishlist={removeFromWishlist}
        wishlistRef={wishlistRef}
        toggleWishlist={toggleWishlist}
      />
      <CartMenu
        isLoggedIn={isLoggedIn}
        cart={cart}
        showCart={showCart}
        setShowCart={setShowCart}
        removeFromCart={removeFromCart}
        cartRef={cartRef}
        toggleCart={toggleCart}
      />
      <UserMenu
        isLoggedIn={isLoggedIn}
        showMenu={showMenu}
        menuRef={menuRef}
        toggleMenu={toggleMenu}
        user={user}
        logout={logout}
      />
    </div>
  );
};

export default NavIcons;
