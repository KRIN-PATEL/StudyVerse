import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import { Star, StarHalf } from "lucide-react";

const Course = ({ course }) => {
  const averageRating = course.averageRating || 0;
  const numberOfRatings = course.ratings?.length || 0;

  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="px-5 py-4 space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            {course.courseTitle}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course.creator?.photoUrl || "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">{course.creator?.name}</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>${course.coursePrice}</span>
          </div>

<div className="flex items-center gap-1 mt-1">
  {[1, 2, 3, 4, 5].map((star) => {
    const diff = averageRating - star + 1;
    return diff >= 1 ? (
      <Star key={star} size={22} className="text-yellow-400 fill-yellow-400" />
    ) : diff >= 0.5 ? (
      <StarHalf key={star} size={22} className="text-yellow-400 fill-yellow-400" />
    ) : (
      <Star key={star} size={22} className="text-gray-300" />
    );
  })}
  <span className="text-lg font-semibold text-muted-foreground ml-3">
    {averageRating.toFixed(1)}{" "}
    <span className="text-sm text-gray-400">({numberOfRatings})</span>
  </span>
</div>

        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
