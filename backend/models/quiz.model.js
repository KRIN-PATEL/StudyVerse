import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  questionType: { 
    type: String, 
    enum: ["multiple_choice", "fill_in_the_blank", "true_false"], 
    required: true 
  },
  options: [{ type: String }], 
  correctAnswer: [{ type: String, required: true }], 
});

const QuizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  questions: [QuestionSchema],
  timeLimit: { type: Number, default: 10 },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", QuizSchema);
