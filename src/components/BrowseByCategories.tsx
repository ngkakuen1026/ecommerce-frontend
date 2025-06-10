import axios from "axios";
import { categoryAPI } from "../services/http-api";
import type { Categories } from "../types/category";
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

const BrowseByCategories = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    axios
      .get(`${categoryAPI.url}`)
      .then((res) => {
        console.log("API response for Categories:", res.data);
        setCategories(res.data.categories);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className="bg-gray-50 p-10">
      <h1 className="pb-2 text-4xl font-bold">Explore the Categories</h1>
      <h2 className="pb-5 text-lg text-gray-600">View all Categories</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative cursor-pointer h-64 rounded-xl overflow-hidden shadow hover:shadow-lg transition group bg-cover bg-center"
            style={{ backgroundImage: `url(${category.image_url})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-2">
              <div className="mb-2">
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
