import express from "express";
import { 
  createQuiz, 
  getAllQuizzes, 
  getQuizById, 
  getQuizByCourse, 
  submitQuiz, 
  publishQuiz,
  updateQuiz, 
  deleteQuiz 
} from "../controllers/quiz.controller.js";

// quiz routes
const router = express.Router();

router.post("/create", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:quizId", getQuizById);
router.get("/course/:courseId", getQuizByCourse);
router.post("/submit/:quizId", submitQuiz);
router.patch("/publish/:quizId", publishQuiz);
router.put("/:quizId", updateQuiz);  
router.delete("/:quizId", deleteQuiz);

export default router;
