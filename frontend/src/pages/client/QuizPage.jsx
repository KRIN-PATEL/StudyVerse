import React, { useState, useEffect } from "react";
import {
  useGetQuizByCourseQuery,
  useSubmitQuizMutation,
} from "@/features/api/quizApi";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";

const QuizPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetQuizByCourseQuery(courseId);
  const [submitQuiz] = useSubmitQuizMutation();

  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [direction, setDirection] = useState(0);

  const questions = data?.quiz?.questions || [];
  const quizId = data?.quiz?._id;
  const timeLimit = data?.quiz?.timeLimit || 600;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (data?.quiz?.timeLimit && timer === 0) {
      setTimer(timeLimit);
    }
  }, [data, timer]);

  useEffect(() => {
    if (timer <= 0 || hasSubmitted) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async () => {
    if (!quizId || hasSubmitted) return;
    setHasSubmitted(true);

    try {
      const answersArray = questions.map((q) => answers[q._id] || []);
      const result = await submitQuiz({
        quizId,
        answers: answersArray,
      }).unwrap();

      toast.success("Quiz submitted!");
      navigate(`/quiz/result/${courseId}`, {
        state: {
          score: result.score,
          correctAnswers: result.correctAnswers,
        },
      });
    } catch (error) {
      toast.error("Failed to submit quiz.");
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (isLoading) return <p className="text-center mt-20">Loading quiz...</p>;
  if (!data?.quiz) return <p className="text-center mt-20">No quiz found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24 transition-all duration-300 text-gray-800 dark:text-gray-100">
      {/* Timer Block */}
      <div className="flex justify-between items-center mb-8 sticky top-16 z-10 bg-[#f1f5f9] dark:bg-[#1f2937] shadow-md p-4 rounded-lg border border-gray-300 dark:border-gray-700">
        <span className="text-base font-bold text-gray-800 dark:text-gray-100">
          Quiz Timer
        </span>
        <span className="flex items-center gap-2 text-2xl font-semibold text-red-600">
          <Clock size={24} className="text-red-600" />
          {formatTime(timer)}
        </span>
      </div>

      {/* Animated Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-8 shadow-xl border dark:border-gray-700 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl mb-6">
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <h2 className="text-black dark:text-white text-xl font-bold mb-6">
              {currentQuestion.questionText}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`block px-4 py-3 border rounded-xl text-lg transition-all cursor-pointer select-none shadow-sm ${
                    answers[currentQuestion._id] === option
                      ? "bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400 text-blue-800 dark:text-blue-200"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestion._id] === option}
                    onChange={() =>
                      setAnswers({ ...answers, [currentQuestion._id]: option })
                    }
                    className="mr-3 accent-blue-600"
                  />
                  {option}
                </label>
              ))}
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          disabled={currentQuestionIndex === 0}
          onClick={() => {
            setDirection(-1);
            setCurrentQuestionIndex((prev) => prev - 1);
          }}
        >
          ⬅ Previous
        </Button>

        {currentQuestionIndex < questions.length - 1 ? (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setDirection(1);
              setCurrentQuestionIndex((prev) => prev + 1);
            }}
          >
            Next ➡
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={hasSubmitted}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
