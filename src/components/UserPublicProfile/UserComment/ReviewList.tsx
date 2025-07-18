import type { ReviewWithUser } from "./UserComments";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }: { reviews: ReviewWithUser[] }) => {
  if (reviews.length === 0) {
    return (
      <p className="text-gray-400 text-sm mt-4">
        This user has no reviews yet.
      </p>
    );
  }

  return (
    <div className="mt-8">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;