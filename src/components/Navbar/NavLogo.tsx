import { Link } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="flex-none">
      <Link to="/" className="text-3xl font-bold text-blue-500">
        Shoporia
      </Link>
    </div>
  );
};

export default NavLogo;