import React, { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { userAPI } from "../../../services/http-api";
import authAxios from "../../../services/authAxios";

interface Props {
  userId: string | number;
  onSuccess: () => void;
  onCancel: () => void;
}

const AddUserReview = ({ userId, onSuccess, onCancel }: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await authAxios.post(`${userAPI.url}/${userId}/reviews/create`, {
        rating,
        comment,
        title,
      });

      setRating(0);
      setComment("");
      setTitle("");
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
    <form onSubmit={handleSubmit} className="mb-8 space-y-4 w-full md:w-1/3">
      <h3 className="text-lg font-semibold">Write a Review</h3>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            onClick={() => setRating(i)}
            className={`w-5 h-5 cursor-pointer ${
              i <= rating ? "fill-blue-500 stroke-blue-500" : "stroke-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">
          {rating} star{rating !== 1 ? "s" : ""}
        </span>
      </div>

      <input
        type="text"
        placeholder="Title (optional)"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your comment..."
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          disabled={submitting || rating === 0 || !comment}
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
  );
};

export default AddUserReview;
