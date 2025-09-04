import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
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
  );
};

export default NavLinks;