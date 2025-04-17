import React, { useState, useEffect } from "react";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} from "@/features/api/courseApi";
import { Trash, Edit, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const ManageCourses = () => {
  const { data, isLoading, isError } = useGetAllCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  const [filter, setFilter] = useState("all");
  const [courses, setCourses] = useState(data?.courses || []);

  useEffect(() => {
    setCourses(data?.courses || []);
  }, [data]);

  const handleDelete = async (courseId) => {
    try {
      setCourses(courses.filter((course) => course._id !== courseId));
      await deleteCourse(courseId).unwrap();
    } catch (error) {
      console.error("Error deleting course:", error);
      setCourses(data?.courses || []);
    }
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.isPublished.toString() === filter);

  if (isLoading)
    return (
      <p className="text-center mt-10 dark:text-white">Loading courses...</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 dark:text-red-400">
        Failed to load courses
      </p>
    );

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
        Manage Courses
      </h1>

      {/* Filter Section */}
      <div className="flex flex-wrap items-center space-x-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-800 dark:text-white" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Filter by Status
          </h2>
        </div>
        <div className="flex flex-wrap space-x-4 mt-2 md:mt-0">
          <button
            onClick={() => handleFilterChange("all")}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-2 rounded-md transition duration-300"
          >
            All Courses
          </button>
          <button
            onClick={() => handleFilterChange("true")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Published
          </button>
          <button
            onClick={() => handleFilterChange("false")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
          >
            Unpublished
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-2 rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
            <tr>
              <th className="px-6 py-4 text-left">Course Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses?.map((course) => (
              <tr
                key={course._id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 text-gray-800 dark:text-gray-300"
              >
                <td className="px-6 py-4">{course.courseTitle}</td>
                <td className="px-6 py-4">{course.category}</td>
                <td className="px-6 py-4">${course.coursePrice}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <Link
                    to={`/admin/course/${course._id}`}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    <Trash size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;
