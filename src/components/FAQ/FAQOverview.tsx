import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const FAQOverview = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-screen-2xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-4">Shoporia FAQ</h1>
          <p className="text-xl mb-8 text-gray-600">
            If you're new to Shoporia or looking to start using our platform to
            buy and sell, you've come to the right place! Our FAQ section is
            designed to help you navigate the features and services we offer.
            Here, you'll find answers to common questions about creating an
            account, listing products, processing orders, and more. Whether
            you're a buyer seeking the best deals or a seller aiming to reach a
            wider audience, our comprehensive guide will provide the information
            you need to make the most of your Shoporia experience. We're excited
            to help you get started!
          </p>
          {!user ? (
            <p className="text-lg text-gray-600">
              Register Account?{" "}
              <Link
                to="/register"
                className="font-semibold underline hover:opacity-50 italic"
              >
                Click here
              </Link>
            </p>
          ) : null}
        </div>
        <div className="flex-1">
          <img
            src="./src/assets/FAQ.png"
            alt="FAQ"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default FAQOverview;