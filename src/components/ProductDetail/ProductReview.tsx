import { useEffect, useState } from "react";
import { Pencil, Star } from "lucide-react";
import type { ProductReviewType } from "../../types/productReview";
import { productAPI } from "../../services/http-api";
import { Link } from "react-router-dom";
import AddProductReview from "./AddProductReview";
import authAxios from "../../services/authAxios";

interface ReviewWithProducts extends ProductReviewType {
  reviewer_username: string;
  reviewer_profile_image?: string;
}

interface Props {
  productId: string;
}

const ProductReview = ({ productId }: Props) => {
  const [reviews, setReviews] = useState<ReviewWithProducts[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const [showForm, setShowForm] = useState(false);

  const fetchReviews = () => {
    authAxios
      .get(`${productAPI.url}/${productId}/reviews`)
      .then((res) => {
        const enrichedReviews: ReviewWithProducts[] = res.data.reviews;

        setReviews(enrichedReviews);

        if (enrichedReviews.length > 0) {
          const totalRating = enrichedReviews.reduce(
            (sum, r) => sum + r.rating,
            0
          );
          setAverageRating(totalRating / enrichedReviews.length);

          const counts: { [key: number]: number } = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
          };
          enrichedReviews.forEach((review) => {
            counts[review.rating] += 1;
          });
          setRatingCounts(counts);
        }
      })
      .catch((err) => console.error("Failed to load reviews:", err));
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
      {/* Left: Rating Summary */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Customer Rating</h2>

        {!showForm && (
          <>
            {/* Average Rating */}
            <div className="flex items-center gap-2 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? "fill-orange-500 stroke-orange-500"
                      : "stroke-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-black font-semibold">
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>

            <p className="text-sm text-gray-600">
              {reviews.length} global ratings
            </p>

            {/* Rating Bars */}
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star] || 0;
              const percentage = reviews.length
                ? Math.round((count / reviews.length) * 100)
                : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-10">{star} star</span>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-orange-500 h-2 rounded"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right">{percentage}%</span>
                </div>
              );
            })}
          </>
        )}

        {/* Toggle Button */}
        {!showForm && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 w-1/2 border bg-orange-500 text-white rounded-lg hover:bg-gray-100 text-sm flex items-center justify-center gap-2"
            >
              Write a review
              <Pencil className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Show Form */}
        {showForm && (
          <AddProductReview
            productId={productId}
            onSuccess={() => {
              fetchReviews();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {/* Right: Reviews */}
      <div className="lg:col-span-2 space-y-10">
        <h3 className="text-2xl font-semibold">Customer Reviews</h3>

        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  className="hover:opacity-50 flex items-center gap-2"
                  to={`/user/${review.reviewer_username}`}
                >
                  {review.reviewer_profile_image ? (
                    <img
                      src={review.reviewer_profile_image}
                      alt={review.reviewer_username}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                      alt="Default profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="font-semibold">
                    {review.reviewer_username}
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-orange-500 stroke-orange-500"
                        : "stroke-gray-300"
                    }`}
                  />
                ))}
              </div>

              {review.title && (
                <p className="font-semibold mt-1 text-black">{review.title}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Reviewed on{" "}
                {new Date(review.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              <p className="mt-2 text-gray-800">{review.comment}</p>

              <div className="flex gap-4 mt-3 text-sm text-gray-600">
                <button className="px-3 py-1 border rounded hover:bg-gray-100">
                  Helpful
                </button>
                <button className="hover:underline">Report</button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-gray-500 text-lg">
            No reviews were made for this product.
          </h1>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
