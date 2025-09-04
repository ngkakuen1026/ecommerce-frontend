import React from "react";
import type { Categories } from "../../../types/category";
import { Link } from "react-router-dom";
import Spinner from "../../Reuseable/Spinner";

interface AdminCategoryListTableProps {
  categories: Categories[];
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>;
  deleteCategory: (categoryId: number) => void;
  isLoading: boolean;
}

const AdminCategoryListTable = ({
  categories,
  setCategories,
  deleteCategory,
  isLoading,
}: AdminCategoryListTableProps) => {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : categories.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100 text-left border-b">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Category Name</th>
              <th className="py-3 px-4">Category Image</th>
              <th className="py-3 px-4">Delete?</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="py-3 px-4">{category.id}</td>
                <td className="py-3 px-4">
                  <Link
                    to={`category/${category.id}`}
                    className="hover:underline hover:opacity-70"
                  >
                    {category.name}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <img
                    src={category.image_url}
                    alt="Image of Category"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-4">
                  <button
                    className="text-red-500 hover:underline ml-2"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this category?"
                        )
                      ) {
                        deleteCategory(category.id);
                        setCategories((prev) =>
                          prev.filter((c: Categories) => c.id !== category.id)
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default AdminCategoryListTable;
