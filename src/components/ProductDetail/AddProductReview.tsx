import React, { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { productAPI } from "../../services/http-api";
import authAxios from "../../services/authAxios";

interface Props {
  productId: string | number;
  onSuccess: () => void;
  onCancel: () => void;
}

const AddProductReview = ({ productId, onSuccess, onCancel }: Props) => {
  const [userInput, setUserInput] = useState({
    rating: 0,
    comment: "",
    title: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isFormValid =
    userInput.rating > 0 &&
    userInput.title.trim().length > 0 &&
    userInput.comment.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await authAxios.post(
        `${productAPI.url}/${productId}/reviews/create`,
        {
          rating: userInput.rating,
          comment: userInput.comment,
          title: userInput.title,
        },
        {
          withCredentials: true,
        }
      );

      setUserInput({ rating: 0, comment: "", title: "" });
      onSuccess();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 w-full">
        <h3 className="text-lg font-semibold">Write a Review</h3>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              onClick={() => setUserInput({ ...userInput, rating: i })}
              className={`w-5 h-5 cursor-pointer ${
                userInput.rating >= i
                  ? "fill-yellow-500 stroke-yellow-500"
                  : "stroke-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-600 ml-2">
            {userInput.rating} star{userInput.rating !== 1 ? "s" : ""}
          </span>
        </div>

        <input
          type="text"
          placeholder="Review Title"
          value={userInput.title}
          onChange={(e) =>
            setUserInput({ ...userInput, title: e.target.value })
          }
          className="w-full p-2 border rounded mb-2"
        />

        <textarea
          placeholder="Write your review here..."
          value={userInput.comment}
          onChange={(e) =>
            setUserInput({ ...userInput, comment: e.target.value })
          }
          className="w-full p-2 border rounded mb-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting || !isFormValid}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg p-2 ${
              submitting || !isFormValid
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductReview;