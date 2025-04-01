// import React, { useState, useEffect } from "react";
// import { useGetAllCourseReviewsQuery } from "@/features/api/courseApi";
// import { BookOpenCheck, Star, Filter } from "lucide-react";

// const ReviewTable = () => {
//   const { data, isLoading, isError } = useGetAllCourseReviewsQuery();
//   const [selectedRating, setSelectedRating] = useState(null);
//   const [filteredCourses, setFilteredCourses] = useState([]);

//   useEffect(() => {
//     if (!selectedRating) {
//       setFilteredCourses(data?.courses || []);
//     } else {
//       const filtered = data?.courses?.filter((course) =>
//         course.ratings.some((r) => r.rating === selectedRating)
//       );
//       setFilteredCourses(filtered);
//     }
//   }, [selectedRating, data]);

//   if (isLoading) return <p className="text-center mt-10">Loading reviews...</p>;
//   if (isError) return <p className="text-center text-red-500">Failed to load reviews</p>;

//   const handleRatingClick = (rating) => {
//     setSelectedRating((prev) => (prev === rating ? null : rating));
//   };

//   return (
//     <div className="flex flex-col lg:flex-row items-start gap-6 px-4 py-6 sm:px-6 md:px-10 mx-auto max-w-7xl">
//       {/* Filter Sidebar */}
//       <div className="w-full lg:w-60 p-4 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-200 dark:border-gray-700">
//         <div className="flex items-center gap-2 mb-4">
//           <Filter className="text-blue-600" size={20} />
//           <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Filter by Rating
//           </h2>
//         </div>

//         <div className="space-y-3">
//           {[5, 4, 3, 2, 1].map((rating) => (
//             <div
//               key={rating}
//               onClick={() => handleRatingClick(rating)}
//               className={`flex items-center gap-2 cursor-pointer p-1 rounded-md transition ${
//                 selectedRating === rating
//                   ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white font-semibold"
//                   : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//               }`}
//             >
//               {rating}
//               <Star size={16} fill="#FACC15" stroke="#FACC15" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Course Review Section */}
//       <div className="flex-1 space-y-6 pt-2 w-full">
//         <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
//           <BookOpenCheck className="text-blue-600" size={30} />
//           <h1>Course Reviews</h1>
//         </div>

//         {filteredCourses?.length === 0 ? (
//           <p className="text-gray-600 mt-4">No courses match the selected rating.</p>
//         ) : (
//           filteredCourses?.map((course) => (
//             <div
//               key={course._id}
//               className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl p-5 transition hover:shadow-md"
//             >
//               {/* Course Info */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
//                 <img
//                   src={course.courseThumbnail}
//                   alt={course.courseTitle}
//                   className="w-20 h-20 rounded-md object-cover border"
//                 />
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//                     {course.courseTitle}
//                   </h2>
//                   <div className="flex items-center gap-2 mt-1">
//                     {course.creator?.photoUrl && (
//                       <img
//                         src={course.creator.photoUrl}
//                         alt={course.creator.name}
//                         className="w-7 h-7 rounded-full border"
//                       />
//                     )}
//                     <p className="text-sm text-gray-600 dark:text-gray-300">
//                       Created by <span className="font-semibold">{course.creator?.name}</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Ratings */}
//               <div className="space-y-3 mt-4">
//                 {course.ratings.map((r, idx) => (
//                   <div key={idx} className="flex items-center gap-3">
//                     <img
//                       src={r.userId?.photoUrl}
//                       alt={r.userId?.name}
//                       className="w-8 h-8 rounded-full border"
//                     />
//                     <p className="text-gray-800 dark:text-gray-200 font-medium">
//                       {r.userId?.name}:
//                     </p>
//                     <div className="flex items-center text-yellow-500 font-semibold">
//                       {r.rating}
//                       <Star size={16} fill="#FACC15" stroke="#FACC15" className="ml-1" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewTable;


import React, { useState, useEffect } from "react";
import { useGetAllCourseReviewsQuery } from "@/features/api/courseApi";
import { BookOpenCheck, Star, Filter } from "lucide-react";

const ReviewTable = () => {
  const { data, isLoading, isError } = useGetAllCourseReviewsQuery();
  const [selectedRating, setSelectedRating] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (!selectedRating) {
      setFilteredCourses(data?.courses || []);
    } else {
      const filtered = data?.courses?.filter((course) =>
        course.ratings.some((r) => r.rating === selectedRating)
      );
      setFilteredCourses(filtered);
    }
  }, [selectedRating, data]);

  const handleRatingClick = (rating) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const handleResetClick = () => {
    setSelectedRating(null);  // Reset the selected rating filter
  };

  if (isLoading) return <p className="text-center mt-10">Loading reviews...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load reviews</p>;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 px-4 py-6 sm:px-6 md:px-10 mx-auto max-w-7xl">
      {/* Filter Sidebar */}
      <div className="w-full lg:w-60 p-4 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-blue-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filter by Rating</h2>
        </div>

        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div
              key={rating}
              onClick={() => handleRatingClick(rating)}
              className={`flex items-center gap-2 cursor-pointer p-1 rounded-md transition ${
                selectedRating === rating
                  ? "bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-white font-semibold"
                  : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {rating}
              <Star size={16} fill="#FACC15" stroke="#FACC15" />
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <div className="mt-4">
          <button
            onClick={handleResetClick}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-gray-700"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Course Review Section */}
      <div className="flex-1 space-y-6 pt-2 w-full">
        <div className="flex items-center gap-2 text-2xl sm:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          <BookOpenCheck className="text-blue-600" size={30} />
          <h1>Course Reviews</h1>
        </div>

        {filteredCourses?.length === 0 ? (
          <p className="text-gray-600 mt-4">No courses match the selected rating.</p>
        ) : (
          filteredCourses?.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm rounded-xl p-5 transition hover:shadow-md"
            >
              {/* Course Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseTitle}
                  className="w-20 h-20 rounded-md object-cover border"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{course.courseTitle}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {course.creator?.photoUrl && (
                      <img
                        src={course.creator.photoUrl}
                        alt={course.creator.name}
                        className="w-7 h-7 rounded-full border"
                      />
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Created by <span className="font-semibold">{course.creator?.name}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div className="space-y-3 mt-4">
                {course.ratings.map((r, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <img
                      src={r.userId?.photoUrl}
                      alt={r.userId?.name}
                      className="w-8 h-8 rounded-full border"
                    />
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {r.userId?.name}:
                    </p>
                    <div className="flex items-center text-yellow-500 font-semibold">
                      {r.rating}
                      <Star size={16} fill="#FACC15" stroke="#FACC15" className="ml-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewTable;
