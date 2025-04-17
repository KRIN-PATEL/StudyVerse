import React from "react";
import {
  useGetQuizzesQuery,
  useDeleteQuizMutation,
} from "@/features/api/quizApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const QuizTable = () => {
  const { data, isLoading, isError } = useGetQuizzesQuery();
  const [deleteQuiz] = useDeleteQuizMutation();

  if (isLoading) return <p>Loading quizzes...</p>;
  if (isError) return <p>Error loading quizzes.</p>;

  const handleDelete = async (quizId) => {
    await deleteQuiz(quizId);
    toast.success("Quiz deleted successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Quizzes</h1>
      <Link to="/admin/quiz/create">
        <Button className="mb-4">Create New Quiz</Button>
      </Link>

      {/* Quizzes List */}
      <table className="w-full border">
        <thead>
          <tr>
            <th>Course</th>
            <th>Questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.quizzes?.map((quiz) => (
            <tr key={quiz._id}>
              <td>{quiz.course.courseTitle}</td>
              <td>{quiz.questions.length}</td>
              <td>
                <Link to={`/admin/quiz/edit/${quiz._id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button
                  onClick={() => handleDelete(quiz._id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizTable;
