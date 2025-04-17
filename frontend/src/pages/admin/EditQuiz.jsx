import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "@/features/api/quizApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const EditQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetQuizByIdQuery(quizId);
  const [updateQuiz] = useUpdateQuizMutation();
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(0);

  useEffect(() => {
    if (data?.quiz?.questions) {
      setQuestions(JSON.parse(JSON.stringify(data.quiz.questions)));
      setTimeLimit(data.quiz.timeLimit || 0);
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateQuiz({
        quizId,
        updatedQuiz: { questions, timeLimit },
      }).unwrap();
      toast.success("Quiz updated successfully!");
      navigate("/admin/quiz-management");
    } catch (err) {
      toast.error("Failed to update quiz.");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading quiz...</p>;
  if (error)
    return <p className="text-center text-red-600">Error loading quiz.</p>;

  return (
    <div className="p-6 mt-24 max-w-4xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Edit Quiz</h1>

      <div className="mb-6">
        <label className="font-semibold block mb-2">
          Time Limit (in seconds):
        </label>
        <input
          type="number"
          min="1"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          className="border dark:border-gray-700 dark:bg-gray-800 p-2 w-full rounded"
        />
      </div>

      {questions.map((q, index) => (
        <div
          key={index}
          className="mb-6 border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm"
        >
          <input
            type="text"
            placeholder="Enter Question"
            value={q.questionText}
            onChange={(e) => {
              const updated = [...questions];
              updated[index] = {
                ...updated[index],
                questionText: e.target.value,
              };
              setQuestions(updated);
            }}
            className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-3"
          />

          <select
            className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-4"
            value={q.questionType}
            onChange={(e) => {
              const updated = [...questions];
              updated[index] = {
                ...updated[index],
                questionType: e.target.value,
                options: [],
                correctAnswer: [],
              };
              setQuestions(updated);
            }}
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="fill_in_the_blank">Fill in the Blank</option>
            <option value="true_false">True / False</option>
          </select>

          {/* Multiple Choice */}
          {q.questionType === "multiple_choice" && (
            <>
              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...questions];
                    const newOptions = [...updated[index].options];
                    newOptions[optIndex] = e.target.value;
                    updated[index] = { ...updated[index], options: newOptions };
                    setQuestions(updated);
                  }}
                  className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-2"
                />
              ))}
              {q.options.length < 4 && (
                <Button
                  onClick={() => {
                    const updated = [...questions];
                    const newOptions = [...updated[index].options, ""];
                    updated[index] = { ...updated[index], options: newOptions };
                    setQuestions(updated);
                  }}
                  className="mt-2 bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Add Option
                </Button>
              )}
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer[0] || ""}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[index] = {
                    ...updated[index],
                    correctAnswer: [e.target.value],
                  };
                  setQuestions(updated);
                }}
                className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mt-4"
              />
            </>
          )}

          {/* Fill in the Blank */}
          {q.questionType === "fill_in_the_blank" && (
            <>
              {[...Array(3)].map((_, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={q.options[optIndex] || ""}
                  onChange={(e) => {
                    const updated = [...questions];
                    const newOptions = [...(updated[index].options || [])];
                    newOptions[optIndex] = e.target.value;
                    updated[index] = { ...updated[index], options: newOptions };
                    setQuestions(updated);
                  }}
                  className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-2"
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer[0] || ""}
                onChange={(e) => {
                  const updated = [...questions];
                  updated[index] = {
                    ...updated[index],
                    correctAnswer: [e.target.value],
                  };
                  setQuestions(updated);
                }}
                className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mt-2"
              />
            </>
          )}

          {/* True or False */}
          {q.questionType === "true_false" && (
            <>
              {["True", "False"].map((option, optIndex) => (
                <label key={optIndex} className="block mt-2">
                  <input
                    type="radio"
                    name={`true_false_${index}`}
                    value={option}
                    checked={q.correctAnswer[0] === option}
                    onChange={() => {
                      const updated = [...questions];
                      updated[index] = {
                        ...updated[index],
                        correctAnswer: [option],
                        options: ["True", "False"],
                      };
                      setQuestions(updated);
                    }}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </>
          )}
        </div>
      ))}

      <Button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
      >
        Save Quiz
      </Button>
    </div>
  );
};

export default EditQuiz;
