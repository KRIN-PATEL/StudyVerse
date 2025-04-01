import React, { useState, useEffect } from "react";
import { useGetAllCoursesQuery, useDeleteCourseMutation } from "@/features/api/courseApi"; // Updated API hook
import { Trash, Edit, Filter } from "lucide-react"; // Icons for delete, edit, and filter
import { Link } from "react-router-dom"; // Link to navigate to the course details/edit page

const ManageCourses = () => {
  const { data, isLoading, isError } = useGetAllCoursesQuery(); // Use the updated hook
  const [deleteCourse] = useDeleteCourseMutation(); // For deleting a course

  const [filter, setFilter] = useState('all'); // Filter state (all, published, unpublished)
  const [courses, setCourses] = useState(data?.courses || []); // Local state to manage courses after deletion

  useEffect(() => {
    setCourses(data?.courses || []);
  }, [data]);

  const handleDelete = async (courseId) => {
    try {
      // Optimistically update UI by removing the deleted course from local state
      setCourses(courses.filter(course => course._id !== courseId));
      
      // Proceed with deleting the course from the server
      await deleteCourse(courseId).unwrap(); // Use unwrap for handling mutation success
    } catch (error) {
      console.error("Error deleting course:", error);
      // If deletion fails, revert the optimistic update by re-fetching the courses
      setCourses(data?.courses || []);
    }
  };

  // Handle filter change
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  // Filter courses based on filter state
  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.isPublished.toString() === filter);

  if (isLoading) return <p className="text-center mt-10">Loading courses...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load courses</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Courses</h1>

      {/* Filter Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} />
          <h2 className="text-lg font-semibold">Filter by Status</h2>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => handleFilterChange('all')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md transition duration-300"
          >
            All Courses
          </button>
          <button
            onClick={() => handleFilterChange('true')}
            className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-md transition duration-300"
          >
            Published
          </button>
          <button
            onClick={() => handleFilterChange('false')}
            className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-md transition duration-300"
          >
            Unpublished
          </button>
        </div>
      </div>

      {/* Courses Table */}
      <table className="min-w-full table-auto border-separate border-spacing-2 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-4 text-left">Course Title</th>
            <th className="px-6 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Price</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {filteredCourses?.map((course) => (
            <tr key={course._id} className="bg-white hover:bg-gray-50 transition duration-300">
              <td className="px-6 py-4">{course.courseTitle}</td>
              <td className="px-6 py-4">{course.category}</td>
              <td className="px-6 py-4">${course.coursePrice}</td>
              <td className="px-6 py-4 flex space-x-2">
                {/* Edit button */}
                <Link
                  to={`/admin/course/${course._id}`}
                  className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300"
                >
                  <Edit size={16} />
                  Edit
                </Link>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-md transition duration-300"
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
  );
};

export default ManageCourses;
