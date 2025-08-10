import { CreditCard, ShoppingBasket, UsersRound } from "lucide-react";

const SiteFeatures = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-200 to-cyan-400 py-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
        {/* Feature */}
        <div className="group flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:shadow-xl bg-white p-6 rounded-lg border">
          <div className="bg-blue-100 p-3 rounded-full mb-4 transition group-hover:bg-blue-500 group-hover:text-white">
            <ShoppingBasket className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Place your order</h2>
          <p className="text-sm text-gray-500 italic">Buy and Selling 24/7</p>
        </div>

        {/* Feature */}
        <div className="group flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:shadow-xl bg-white p-6 rounded-lg border">
          <div className="bg-blue-100 p-3 rounded-full mb-4 transition group-hover:bg-blue-500 group-hover:text-white">
            <UsersRound className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">10k+ Active members</h2>
          <p className="text-sm text-gray-500 italic">Members all around the world</p>
        </div>

        {/* Feature */}
        <div className="group flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:shadow-xl bg-white p-6 rounded-lg border">
          <div className="bg-blue-100 p-3 rounded-full mb-4 transition group-hover:bg-blue-500 group-hover:text-white">
            <CreditCard className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">100% Payment Secure</h2>
          <p className="text-sm text-gray-500 italic">Pay with secure payment system</p>
        </div>
      </div>
    </div>
  );
};

export default SiteFeatures;