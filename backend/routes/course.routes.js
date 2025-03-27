import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

<<<<<<< HEAD
import { createCourse, createLecture, deleteCourse, editCourse, editLecture, getAllCourseReviews, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, rateCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
const router = express.Router();
// router.route("/published-courses").get( getPublishedCourse);
router.route("/").post(isAuthenticated, createCourse);
router.get("/reviews", isAuthenticated, getAllCourseReviews);
router.route("/search").get(isAuthenticated, searchCourse)
router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
router.post("/:courseId/rate", isAuthenticated, rateCourse);

=======
import { createCourse, createLecture, deleteCourse, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, togglePublishCourse } from "../controllers/course.controller.js";
const router = express.Router();
router.route("/published-courses").get( getPublishedCourse);
router.route("/").post(isAuthenticated, createCourse);
//router.route("/published-courses").get( getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route("/:courseId").get(isAuthenticated, getCourseById);
>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
// router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture );
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture );
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById );
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse );
router.delete("/:courseId", deleteCourse);


export default router;
