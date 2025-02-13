import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../utils/multer.js";
import {
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/user.controller.js";
import { createCourse } from "../controllers/course.controller.js";
const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);

export default router;
