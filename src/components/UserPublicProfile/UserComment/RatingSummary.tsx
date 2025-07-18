import { Star } from "lucide-react";

interface Props {
  average: number;
  count: number;
}

const RatingSummary = ({ average, count }: Props) => {
  return (
    <div>
      <div className="text-5xl font-bold text-blue-600">
        {average.toFixed(2)}
      </div>
      <div className="text-lg text-blue-400 flex gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.round(average)
                ? "fill-blue-400 stroke-blue-400"
                : "stroke-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="text-sm mt-2">
        {count} review{count !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default RatingSummary;