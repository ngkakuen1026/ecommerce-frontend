import { CreditCard, ShoppingBasket, UsersRound, } from "lucide-react";

const SiteFeatures = () => {
  return (
    <div className="bg-white py-3">
      <div className=" flex flex-col md:flex-row items-center justify-evenly">
        <div className="flex flex-col items-center flex-grow">
          <ShoppingBasket className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-lg font-bold">Place your order</h1>
          <p className="font-light">Buy and Selling 24/7</p>
        </div>
        <div className="flex flex-col items-center flex-grow md:border-l-2 md:border-gray-300">
          <UsersRound className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-lg font-bold">10k+ Active member</h1>
          <p className="font-light">Member all around the world</p>
        </div>
        <div className="flex flex-col items-center flex-grow md:border-l-2 md:border-gray-300">
          <CreditCard className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-lg font-bold">100% Payment Secure</h1>
          <p className="font-light">Pay with secure payment system</p>
        </div>
      </div>
    </div>
  );
};

export default SiteFeatures;
