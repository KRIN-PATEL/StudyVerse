import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // For dynamic routing
import { useGetUsersQuery } from "@/features/api/authApi"; // Importing the query for fetching users
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";  // Avatar components
import { Button } from "@/components/ui/button"; // Import the button component

const UserDetailPage = () => {
  const { userId } = useParams();  // Get the userId from the URL
  const { data, isLoading, error } = useGetUsersQuery();  // Fetch all users
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  // For navigation

  useEffect(() => {
    if (data) {
      const foundUser = data.users.find((u) => u._id === userId);
      setUser(foundUser);
    }
  }, [data, userId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleBackClick = () => {
    navigate("/admin/users");  // Navigate back to the Users page
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-20 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">User Details</h1>
      
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Back to Users
      </button>
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
              alt={user.name || "User Avatar"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled in any courses yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-100 p-4 rounded-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={course.courseThumbnail || "https://via.placeholder.com/150"} // Display course image
                  alt={course.courseTitle}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="font-semibold">{course.courseTitle}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
