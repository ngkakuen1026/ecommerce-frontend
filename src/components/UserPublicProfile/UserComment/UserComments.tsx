import { useEffect, useState } from "react";
import { userAPI } from "../../../services/http-api";
import type { UserReviewType } from "../../../types/userReivew";

import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";
import WriteReviewButton from "./WriteReviewButton";
import AddUserReview from "./AddUserReview";
import authAxios from "../../../services/authAxios";

export interface ReviewWithUser extends UserReviewType {
  reviewer_username: string;
  reviewer_profile_image?: string;
}

interface Props {
  userId: string | number;
}

const UserComments = ({ userId }: Props) => {
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = () => {
    if (!userId) return;
    authAxios
      .get(`${userAPI.url}/${userId}/reviews`)
      .then((res) => {
        const reviewData: ReviewWithUser[] = res.data.reviews;
        setReviews(reviewData);

        if (reviewData.length > 0) {
          const totalRating = reviewData.reduce((sum, r) => sum + r.rating, 0);
          setAverageRating(totalRating / reviewData.length);
        } else {
          setAverageRating(0);
        }
      })
      .catch((err) => console.error("Failed to load user reviews:", err));
  };

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  return (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">User Ratings</h2>
        {!showForm && <WriteReviewButton onClick={() => setShowForm(true)} />}
      </div>

      <RatingSummary average={averageRating} count={reviews.length} />

      {showForm && (
        <div className="mt-6">
          <AddUserReview
            userId={userId}
            onSuccess={() => {
              fetchReviews();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
};

export default UserComments;