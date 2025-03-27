import express from "express";
import {
<<<<<<< HEAD
  deleteUser,
  getUserProfile,
  getUsers,
=======
  getUserProfile,
>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
import {
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/user.controller.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router
  .route("/profile/update")
  .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-otp").post(verifyOTP);
router.route("/reset-password").post(resetPassword);
<<<<<<< HEAD
router.route("/users").get(getUsers); 
router.route("/users/:userId").delete(deleteUser); 

=======
>>>>>>> 9bafa994e1735c0374a9f3aa4dff394f09dfe2b1

export default router;
