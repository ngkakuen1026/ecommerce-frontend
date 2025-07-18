import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReviewWithUser } from "./UserComments";

const timeAgo = (dateString: string) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  if (years > 0) return `Reviewed ${years} year${years > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months > 0) return `Reviewed ${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `Reviewed ${days} day${days > 1 ? "s" : ""} ago`;
  return "Reviewed Recently";
};

const ReviewItem = ({ review }: { review: ReviewWithUser }) => {
  return (
    <div className="border-t border-gray-200 py-6 last:border-b">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={
            review.reviewer_profile_image ||
            "https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
          }
          alt={review.reviewer_username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">
            <Link to={`/user/${review.reviewer_username}`}>
              <span className="hover:opacity-50">
                {review.reviewer_username}
              </span>
            </Link>
          </div>
          <div className="text-xs text-gray-400">
            {timeAgo(review.created_at)}
          </div>
        </div>
      </div>
      <p className="text-xl font-semibold tracking-wide italic text-gray-800">
        {review.title}
      </p>
      <div className="flex gap-1 text-blue-400 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "fill-blue-400 stroke-blue-400"
                : "stroke-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-lg text-gray-800">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;
