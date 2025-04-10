import Quiz from "../models/quiz.model.js";
import {Course} from "../models/course.model.js"; 

// Create a quiz for a course
// export const createQuiz = async (req, res) => {
//   try {
//     const { courseId, questions, timeLimit } = req.body;
//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     const quiz = new Quiz({ courseId, questions, timeLimit });
//     await quiz.save();

//     res.status(201).json({ success: true, message: "Quiz created successfully", quiz });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const createQuiz = async (req, res) => {
  try {
    const { courseId, questions, timeLimit } = req.body;

    if (!timeLimit || isNaN(timeLimit)) {
      return res.status(400).json({ message: "Quiz time limit is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const quiz = new Quiz({ courseId, questions, timeLimit });
    await quiz.save();

    res.status(201).json({ success: true, message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get all quizzes (For Admin Panel)
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("courseId", "courseTitle");
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate("courseId", "courseTitle");

    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a quiz for a specific course
export const getQuizByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quiz = await Quiz.findOne({ courseId }).populate("courseId", "courseTitle");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    let correctAnswers = 0;

    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index]; // Should be a string
      const correctAnswer = question.correctAnswer[0]; // Only first correct answer for now

      if (userAnswer === correctAnswer) {
        score += 1;
        correctAnswers += 1;
      }
    });

    res.status(200).json({ success: true, message: "Quiz submitted successfully", score, correctAnswers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Publish a quiz (Admin)
export const publishQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(quizId, { published: true }, { new: true });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ success: true, message: "Quiz published successfully", quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a quiz
export const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questions, timeLimit } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { questions, timeLimit },
      { new: true }
    );

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a quiz (Admin)
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByIdAndDelete(quizId);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};