import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.routes.js";
import cors from "cors";
dotenv.config({});

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

app.use("/api/v1/user", userRoute);

app.get("home", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});