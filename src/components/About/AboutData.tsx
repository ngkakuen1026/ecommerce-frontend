import React from "react";
import { User, ShoppingCart, Box } from "lucide-react";

type AboutDataProps = {
  userLength: number;
  orderLength: number;
  productLength: number;
};

const AboutData: React.FC<AboutDataProps> = ({
  userLength,
  orderLength,
  productLength,
}) => {
  return (
    <div className="p-12 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-screen-2xl mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-8">
          Overview of our platform
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Shoporia has made significant strides and captured people's attention
          by offering a unique shopping experience that focuses on quality,
          creativity, and community engagement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <User className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Users</h3>
            <p className="text-gray-600 text-lg">
              Over <span className="font-semibold">{userLength}</span> users
              registered
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <ShoppingCart className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Orders</h3>
            <p className="text-gray-600 text-lg">
              Over <span className="font-semibold">{orderLength}</span> orders
              have been made
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Box className="text-5xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-800">Products</h3>
            <p className="text-gray-600 text-lg">
              Over <span className="font-semibold">{productLength}</span>{" "}
              products listed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutData;
