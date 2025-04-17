import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetQuizByCourseQuery } from "@/features/api/quizApi";
import { useGetCourseByIdQuery } from "@/features/api/courseApi";
import { useDownloadCertificateMutation } from "@/features/api/certificateApi";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Download,
  PartyPopper,
  BadgeCheck,
  XCircle,
} from "lucide-react";
import { useLoadUserQuery } from "@/features/api/authApi";
import { launchFireworks } from "@/lib/fireworks";

const QuizResult = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(location.state || null);

  const { data: quizData } = useGetQuizByCourseQuery(courseId);
  const { data: userData } = useLoadUserQuery();
  const { data: courseData } = useGetCourseByIdQuery(courseId);
  const [downloadCertificate] = useDownloadCertificateMutation();

  const userName = userData?.user?.name || "Learner";
  const courseName = courseData?.course?.courseTitle || "Course";

  // Calculate pass status
  const totalQuestions = quizData?.quiz?.questions?.length || 0;
  const isPassed =
    result &&
    totalQuestions > 0 &&
    result.score >= Math.ceil(0.6 * totalQuestions); // 60% passing rule

  useEffect(() => {
    if (!location.state) {
      setResult(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (result && isPassed) {
      launchFireworks();
    }
  }, [result, isPassed]);

  const handleCertificateDownload = () => {
    const encodedName = encodeURIComponent(userName);
    const encodedCourseName = encodeURIComponent(courseName);
    const url = `http://localhost:1552/api/v1/certificate/generate?name=${encodedName}&courseName=${encodedCourseName}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#0f172a] dark:to-[#1e293b] px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-white dark:bg-[#0f172a] shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-3xl p-10 max-w-md w-full text-center border border-blue-200 dark:border-slate-700"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isPassed ? (
            <CheckCircle
              size={56}
              className="text-green-600 dark:text-green-400 mb-4"
            />
          ) : (
            <XCircle
              size={56}
              className="text-red-600 dark:text-red-400 mb-4"
            />
          )}

          <div
            className={`flex items-center justify-center gap-2 ${
              isPassed
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            <PartyPopper size={32} />
            <h1 className="text-3xl font-extrabold">Quiz Completed!</h1>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Well done, {userName}! Here's how you did:
          </p>
        </motion.div>

        {result ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
              <span className="text-gray-600 dark:text-gray-300">
                Your Score:
              </span>{" "}
              <span className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                {result.score}
              </span>
            </div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              <span className="text-gray-600 dark:text-gray-300">
                Correct Answers:
              </span>{" "}
              <span className="text-2xl text-blue-500 dark:text-blue-300">
                {result.correctAnswers}
              </span>
            </div>

            <div className="mt-4 text-md font-medium flex items-center justify-center gap-2">
              {isPassed ? (
                <>
                  <BadgeCheck size={20} className="text-green-500" />
                  <span className="text-green-600 dark:text-green-400">
                    You passed the quiz!
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={20} className="text-red-500" />
                  <span className="text-red-600 dark:text-red-400">
                    You did not pass. Try again!
                  </span>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.p
            className="text-gray-500 dark:text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            No quiz result found. Please avoid refreshing after quiz submission.
          </motion.p>
        )}

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={() => navigate(`/course-progress/${courseId}`)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <ArrowRight size={18} /> Back to Course Progress
          </Button>

          {isPassed && (
            <Button
              onClick={handleCertificateDownload}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download Certificate
            </Button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QuizResult;
