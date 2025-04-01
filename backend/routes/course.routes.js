import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

import { createCourse, createLecture, deleteCourse, editCourse, editLecture, getAllCourseReviews, getAllCourses, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, rateCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
const router = express.Router();
// router.route("/published-courses").get( getPublishedCourse);
router.route("/").post(isAuthenticated, createCourse);
router.get("/", isAuthenticated, getAllCourses); 
router.get("/reviews", isAuthenticated, getAllCourseReviews);
router.route("/search").get(isAuthenticated, searchCourse)
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.post("/:courseId/rate", isAuthenticated, rateCourse);

router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
// router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture );
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture );
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById );
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse );
router.delete("/:courseId", deleteCourse);


export default router;
