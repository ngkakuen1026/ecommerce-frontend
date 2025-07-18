import React from "react";
import type { Categories } from "../../types/category";

interface Props {
  categories: Categories[];
  onCategoryClick: (category: Categories) => void;
}

const RandomCategoryCards: React.FC<Props> = ({ categories, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onCategoryClick(category)}
          className="relative h-96 rounded-lg overflow-hidden shadow group cursor-pointer bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image_url})` }}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-300" />
          <div className="absolute top-4 left-4 z-10">
            <h2 className="text-white text-xl font-bold drop-shadow-sm">
              {category.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RandomCategoryCards;