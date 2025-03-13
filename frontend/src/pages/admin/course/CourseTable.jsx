import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, PlusCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CourseTable = () => {
  const { data, isLoading, refetch } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createCourseHandler = async () => {
    navigate("create");

    // Wait for a short delay before refetching to ensure data is updated
    setTimeout(() => {
      refetch();
      toast.success("New course added!", { style: { color: "green" } });
    }, 1000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <h1 className="text-lg font-semibold">Loading...</h1>
      </div>
    );

  return (
    <div className="mt-10 bg-white dark:bg-black shadow-lg rounded-lg p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Existing Courses
        </h2>
        <Button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={createCourseHandler}
        >
          <PlusCircle size={18} />
          Create a New Course
        </Button>
      </div>

      {/* Course Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <TableCaption className="text-gray-600 dark:text-gray-300 font-semibold">
            A list of your recent courses
          </TableCaption>
          <TableHeader className="bg-gray-100 dark:bg-black">
            <TableRow>
              <TableHead className="w-[100px] font-bold text-gray-800 dark:text-white">
                Price
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-white">
                Status
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-white">
                Title
              </TableHead>
              <TableHead className="text-right font-bold text-gray-800 dark:text-white">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.courses?.map((course) => (
              <TableRow
                key={course._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <TableCell className="font-medium text-gray-700 dark:text-white">
                  {course?.coursePrice ? `$${course.coursePrice}` : "NA"}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`${
                      course.isPublished ? "bg-green-600" : "bg-yellow-500"
                    } text-white`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700 dark:text-white">
                  {course.courseTitle}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
