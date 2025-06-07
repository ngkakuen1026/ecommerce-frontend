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
        console.log("API response:", res.data);
        setCategories(res.data.categories);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className="p-10">
      <h1 className="pb-5 text-4xl font-bold text-center">
        Explore the Categories
      </h1>
      <div className="grid max-w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 drop-shadow-lg">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition"
          >
            <div className="mb-2 text-indigo-600">
              <IconForCategory name={category.name} />
            </div>
            <p className="font-medium group-hover:text-blue-600 transition">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const IconForCategory = ({ name }: { name: string }) => {
  const key = name.toLowerCase();

  if (key.includes("fashion"))
    return <ShoppingBag className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("electronics"))
    return <Monitor className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("home")) return <Home className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("beauty"))
    return <Sparkles className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("health"))
    return <HeartPulse className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("baby") || key.includes("kids"))
    return <Baby className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("sports") || key.includes("outdoors"))
    return <Dumbbell className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("books") || key.includes("media"))
    return <BookOpen className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("grocery") || key.includes("food"))
    return <Utensils className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("automotive"))
    return <Car className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("pet"))
    return <PawPrint className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("office") || key.includes("school"))
    return <PencilRuler className="w-8 h-8 md:w-10 md:h-10" />;
  if (key.includes("toys") || key.includes("games") || key.includes("hobbies"))
    return <Gamepad2 className="w-8 h-8 md:w-10 md:h-10" />;

  // Fallback icon
  return <CircleUser className="w-8 h-8 md:w-10 md:h-10" />;
};

export default BrowseByCategories;
