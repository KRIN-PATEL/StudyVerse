<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
=======
import { Badge } from "lucide-react";
>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
<<<<<<< HEAD
   
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnial"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Intructor: <span className="font-bold">{course.creator?.name}</span>{" "}
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">${course.coursePrice}</h1>
      </div>
=======
  const courseId = "abcde";
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-details/${courseId}`}
        className='flex flex-col md"flex-row gap-4 w-full md:w-auto'
      >
        <img
          src={
            "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230202143636/NEXT-js-tutorial-1.png"
          }
          alt=" course thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">Course Title</h1>
          <p className="text-sm text-gray-600">Subtitle</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold">Yashkumar Jagani</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">Medium</Badge>
        </div>
      </Link>
>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
    </div>
  );
};

export default SearchResult;
