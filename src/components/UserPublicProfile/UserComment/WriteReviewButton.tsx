import { Pencil } from "lucide-react";

const WriteReviewButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm flex items-center gap-2 self-start sm:self-center"
    >
      Write a Review
      <Pencil className="w-4 h-4" />
    </button>
  );
};

export default WriteReviewButton;
