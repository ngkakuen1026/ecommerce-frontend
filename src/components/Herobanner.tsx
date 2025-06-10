import { Search } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-cyan-200 to-cyan-400 py-20 px-8">
      <div className="x-auto flex flex-col-reverse md:flex-row items-center">
        <div className="flex-1 text-center pt-8 md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover the Best Deals at Shoporia
          </h1>
          <p className="text-lg text-gray-700">
            Shop the latest products at unbeatable prices. Fast shipping and
            great service.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Buy and Sell your products here!
          </p>
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 relative mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 text-sm sm:text-base"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-blue-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex-1">
          <img
            src="../src/assets/herobanner.png"
            alt="Hero Banner"
            className="w-full mx-auto rounded-lg shadow"
            // className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
