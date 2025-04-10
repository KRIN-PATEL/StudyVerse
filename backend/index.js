import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.routes.js";
import courseRoute from "./routes/course.routes.js";
import purchaseRoute from "./routes/purchaseCourse.route.js"
import cors from "cors";
import mediaRoute from "./routes/media.route.js";
import { createCourse } from "./controllers/course.controller.js";
dotenv.config({});
import  CourseProgressRoute  from "./routes/courseProgress.route.js";
import quizRoute from "./routes/quiz.routes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


connectDB();

const PORT = 1552;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // backend url  for teesting
    // origin: "http://localhost:1552",
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/courseProgress", CourseProgressRoute);
// quiz routes
app.use("/api/v1/quiz", quizRoute);
// certificate routes
app.use("/api/v1/certificate", certificateRoutes);

app.get("home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
