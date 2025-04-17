import React, { useState } from "react";
import { useCreateQuizMutation } from "@/features/api/quizApi";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CreateQuiz = () => {
  const { data: coursesData, isLoading: coursesLoading } =
    useGetPublishedCourseQuery();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(10);
  const navigate = useNavigate();
  const [createQuiz, { isLoading }] = useCreateQuizMutation();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "multiple_choice",
        options: ["", "", "", ""],
        correctAnswer: [],
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!selectedCourseId) {
      toast.error("Please select a course!");
      return;
    }

    try {
      await createQuiz({
        courseId: selectedCourseId,
        timeLimit: timeLimit * 60,
        questions,
      }).unwrap();

      toast.success("Quiz created successfully!");
      navigate("/admin/quiz-management");
    } catch (error) {
      toast.error("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div className="p-6 mt-24 max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-md text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Create Quiz</h1>

      {/* Select Course */}
      <label className="font-semibold block mb-1">Select Course:</label>
      {coursesLoading ? (
        <p>Loading courses...</p>
      ) : (
        <select
          className="border dark:border-gray-700 dark:bg-gray-800 p-2 w-full rounded mb-4"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">Select a course</option>
          {coursesData?.courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      )}

      {/* Timer */}
      <div className="mb-6">
        <label className="font-semibold block mb-1">
          Time Limit (in minutes):
        </label>
        <input
          type="number"
          min={1}
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          className="border dark:border-gray-700 dark:bg-gray-800 p-2 w-full rounded"
        />
      </div>

      {/* Questions */}
      {questions.map((q, index) => (
        <div
          key={index}
          className="mb-6 border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
        >
          <input
            type="text"
            placeholder="Enter Question"
            value={q.questionText}
            onChange={(e) => {
              const updated = [...questions];
              updated[index].questionText = e.target.value;
              setQuestions(updated);
            }}
            className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-3"
          />

          <select
            value={q.questionType}
            onChange={(e) => {
              const updated = [...questions];
              updated[index].questionType = e.target.value;
              updated[index].options =
                e.target.value === "true_false"
                  ? ["True", "False"]
                  : ["", "", "", ""];
              updated[index].correctAnswer = [];
              setQuestions(updated);
            }}
            className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-4"
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
                    updated[index].options[optIndex] = e.target.value;
                    setQuestions(updated);
                  }}
                  className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-2"
                />
              ))}
              <label className="font-semibold block mt-2">
                Correct Answer:
              </label>
              <select
                className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded"
                onChange={(e) => {
                  const updated = [...questions];
                  updated[index].correctAnswer = [e.target.value];
                  setQuestions(updated);
                }}
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
                    updated[index].options[optIndex] = e.target.value;
                    setQuestions(updated);
                  }}
                  className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded mb-2"
                />
              ))}
              <label className="font-semibold block mt-2">
                Correct Answer:
              </label>
              <select
                className="border dark:border-gray-600 dark:bg-gray-900 p-2 w-full rounded"
                onChange={(e) => {
                  const updated = [...questions];
                  updated[index].correctAnswer = [e.target.value];
                  setQuestions(updated);
                }}
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((option, optIndex) => (
                  <option key={optIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* True / False */}
          {q.questionType === "true_false" && (
            <>
              {["True", "False"].map((option, optIndex) => (
                <label key={optIndex} className="block mt-2">
                  <input
                    type="radio"
                    name={`true_false_${index}`}
                    value={option}
                    checked={q.correctAnswer.includes(option)}
                    onChange={() => {
                      const updated = [...questions];
                      updated[index].correctAnswer = [option];
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

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          onClick={addQuestion}
          className="bg-gray-800 hover:bg-gray-900 text-white"
        >
          Add Question
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Quiz"}
        </Button>
      </div>
    </div>
  );
};

export default CreateQuiz;
