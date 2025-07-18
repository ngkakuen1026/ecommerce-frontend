import { Heart, ShoppingBasket } from "lucide-react";

const ProductActions = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow">
        <Heart className="w-5 h-5" />
        Add to Wishlist
      </button>
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow">
        <ShoppingBasket className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductActions;