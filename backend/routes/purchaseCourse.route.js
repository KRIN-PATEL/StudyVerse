import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
<<<<<<< HEAD
import { createCheckoutSession,  getAllPurchasedCourse,  getCourseDetailWithPurchaseStatus,  getDashboardStats,  stripeWebhook } from "../controllers/coursePurchase.controller.js";
// route for the course purchase
=======
import { createCheckoutSession,  getAllPurchasedCourse,  getCourseDetailWithPurchaseStatus,  stripeWebhook } from "../controllers/coursePurchase.controller.js";
// routing for the course purchase
>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({type:"application/json"}), stripeWebhook);
router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchaseStatus);

<<<<<<< HEAD

router.route("/").get(isAuthenticated, getAllPurchasedCourse);

router.get("/stats", isAuthenticated, getDashboardStats);
=======
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
export default router;