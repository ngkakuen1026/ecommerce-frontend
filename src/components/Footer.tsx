import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleChange = () => {};

  return (
    <footer className="relative bg-gray-50 mt-auto py-12 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col mb-6 md:px-12">
          <h1 className="text-xl mb-2">
            Subscribe to us to get the latest news, discounts, and more!
          </h1>
          <div className="flex">
            <input
              type="email"
              placeholder="Your e-mail address"
              className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 md:w-1/3"
            />
            <button className="bg-gray-800 text-white rounded-r-md px-4 py-2 hover:bg-gray-700">
              Join
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="flex flex-col gap-2 self-center flex-1 md:p-12">
            <Link to="/" className="text-4xl font-bold text-blue-500 mb-8">
              Shoporia
            </Link>
            <p className="text-gray-600 italic mb-4">
              Start using Shoporia to easily buy and sell a wide range of
              products. Our platform connects you with a vibrant community,
              offering secure transactions and user-friendly navigation. Join us
              today and explore endless possibilities!
            </p>
            <ul className="flex gap-4 mb-4">
              {[
                { icon: <Facebook size={30} />, key: "facebook" },
                { icon: <Youtube size={30} />, key: "youtube" },
                { icon: <Instagram size={30} />, key: "instagram" },
                { icon: <Twitter size={30} />, key: "twitter" },
              ].map((link) => (
                <li key={link.key} className="hover:opacity-70 cursor-pointer">
                  {link.icon}
                </li>
              ))}
            </ul>
            <select
              name="Language"
              onChange={handleChange}
              className="text-gray-600 w-full md:w-1/2 mb-4 md:mb-0 px-4 py-2 rounded-lg border border-cyan-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            >
              <option value="en">English - EN</option>
              <option value="zh-tw">Traditional Chinese - ZH</option>
              <option value="zh-cn">Simplified Chinese - ZH</option>
              <option value="ja">Japanese - JA</option>
              <option value="ko">Korean - KO</option>
              <option value="es">español - ES</option>
              <option value="ar">العربية - AR</option>
              <option value="de">Deutsch - DE</option>
              <option value="he">עברית - HE</option>
              <option value="pt">português - PT</option>
            </select>
          </div>

          <div className="flex flex-col mb-4 flex-1">
            <h2 className="text-lg font-semibold mb-2">QUICK LINK</h2>
            <ul className="space-y-1">
              {[
                { label: "All Products", path: "/categories" },
                { label: "All Categories", path: "/categories" },
                { label: "Add Product", path: "/add-product" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-lg text-gray-600 hover:text-blue-600 hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col mb-4 flex-1">
            <h2 className="text-lg font-semibold mb-2">CUSTOMER SUPPORT</h2>
            <ul className="space-y-1">
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Contact Us", path: "/contact" },
                { label: "Return & Refunds", path: "/return&refunds" },
                { label: "Term of Use", path: "/term-of-use" },
                { label: "Privacy Notice", path: "/privacy-notice" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-lg text-gray-600 hover:text-blue-600 hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col mb-4 flex-1">
            <h2 className="text-lg font-semibold mb-2">ABOUT US</h2>
            <ul className="space-y-1">
              {[
                { label: "Our Story", path: "/about" },
                { label: "Careers with Shoporia", path: "/careers" },
                { label: "News", path: "/news" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-lg text-gray-600 hover:text-blue-600 hover:opacity-70"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 pt-6 z-10 relative">
          <div className="mx-auto flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 text-center">
            {[
              { label: "Term of Use", path: "/term-of-use" },
              { label: "Privacy Notice", path: "/privacy-notice" },
              {
                label: "Consumer Health Data Privacy Disclosure",
                path: "/consumer-health",
              },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-base text-gray-400 hover:text-blue-500 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-2">
            <h1 className="text-gray-500 text-center text-sm">
              © 2025 Shoporia.com, Inc. All rights reserved.
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
