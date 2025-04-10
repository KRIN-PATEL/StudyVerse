
import express from "express";
import { generateCertificate } from "../controllers/certificateController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/generate", isAuthenticated, generateCertificate);

export default router;
