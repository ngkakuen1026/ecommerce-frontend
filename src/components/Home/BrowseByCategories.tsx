import { categoryAPI } from "../../services/http-api";
import type { Categories } from "../../types/category";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Monitor,
  Home,
  Sparkles,
  HeartPulse,
  Baby,
  Dumbbell,
  BookOpen,
  Utensils,
  Car,
  PawPrint,
  PencilRuler,
  Gamepad2,
  CircleUser,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import authAxios from "../../services/authAxios";

const BrowseByCategories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories?name=${encodeURIComponent(categoryName)}`);
  };

  useEffect(() => {
    authAxios
      .get(`${categoryAPI.url}`)
      .then((res) => {
        const fetchedCategirues = res.data.categories;
        setCategories(fetchedCategirues.slice(0, 10));
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className="bg-gray-50 px-6 py-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-4xl font-bold">Explore the Categories</h1>
          <Link
            to="/categories"
            className="text-lg text-gray-600 hover:opacity-50 whitespace-nowrap"
          >
            View all categories...
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="relative cursor-pointer h-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition group bg-cover bg-center duration-300 ease-in-out transform hover:scale-105"
              style={{ backgroundImage: `url(${category.image_url})` }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-2">
                <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
                  <IconForCategory name={category.name} className="w-8 h-8" />
                </div>
                <p className="font-semibold text-base sm:text-lg">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const IconForCategory = ({
  name,
  className = "w-8 h-8 md:w-10 md:h-10",
}: {
  name: string;
  className?: string;
}) => {
  const key = name.toLowerCase();

  if (key.includes("fashion")) return <ShoppingBag className={className} />;
  if (key.includes("electronics")) return <Monitor className={className} />;
  if (key.includes("home")) return <Home className={className} />;
  if (key.includes("beauty")) return <Sparkles className={className} />;
  if (key.includes("health")) return <HeartPulse className={className} />;
  if (key.includes("baby") || key.includes("kids"))
    return <Baby className={className} />;
  if (key.includes("sports") || key.includes("outdoors"))
    return <Dumbbell className={className} />;
  if (key.includes("books") || key.includes("media"))
    return <BookOpen className={className} />;
  if (key.includes("grocery") || key.includes("food"))
    return <Utensils className={className} />;
  if (key.includes("automotive")) return <Car className={className} />;
  if (key.includes("pet")) return <PawPrint className={className} />;
  if (key.includes("office") || key.includes("school"))
    return <PencilRuler className={className} />;
  if (key.includes("toys") || key.includes("games") || key.includes("hobbies"))
    return <Gamepad2 className={className} />;
  return <CircleUser className={className} />;
};

export default BrowseByCategories;
