import React from "react";
import {
  useGetAllQuizzesQuery,
  useDeleteQuizMutation,
} from "@/features/api/quizApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Trash, Edit } from "lucide-react";
import { toast } from "sonner";

const QuizManagement = () => {
  const { data, isLoading, refetch } = useGetAllQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz(quizId);
      toast.success("Quiz deleted successfully!");
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-24">
      <div className="flex justify-end mb-6">
        <Link to="/admin/quiz/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create New Quiz
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-gray-500 dark:text-gray-300" />
        </div>
      ) : !data?.quizzes || data.quizzes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No quizzes found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="text-gray-800 dark:text-gray-100">
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
                  Course
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
                  Total Questions
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              {data.quizzes.map((quiz) => (
                <tr
                  key={quiz._id}
                  className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {quiz.courseId?.courseTitle || "Unknown Course"}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {quiz.questions.length}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    <div className="flex gap-2">
                      <Link to={`/admin/quiz/edit/${quiz._id}`}>
                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          <Edit size={16} />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleDelete(quiz._id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;
