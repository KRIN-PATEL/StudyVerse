import { Star, StarHalf } from "lucide-react";
import { useState } from "react";
import { useRateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const StarRating = ({ courseId, isRatedByUser, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState(0);
  const [hasRated, setHasRated] = useState(isRatedByUser);
  const [rateCourse] = useRateCourseMutation();

  const handleClick = async (value) => {
    if (hasRated) return;

    try {
      await rateCourse({ courseId, rating: value }).unwrap();
      toast.success("Thanks for your feedback!", { duration: 3000 });
      setRating(value);
      setHasRated(true);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to rate course");
    }
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const diff = rating - star + 1;
        return diff >= 1 ? (
          <Star
            key={star}
            size={28}
            className="text-yellow-400 fill-yellow-400 cursor-pointer transition-transform hover:scale-110"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          />
        ) : diff >= 0.5 ? (
          <StarHalf
            key={star}
            size={28}
            className="text-yellow-400 fill-yellow-400 cursor-pointer transition-transform hover:scale-110"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          />
        ) : (
          <Star
            key={star}
            size={28}
            className={`${
              hovered >= star ? "text-yellow-300" : "text-gray-300"
            } cursor-pointer transition-transform hover:scale-110`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
