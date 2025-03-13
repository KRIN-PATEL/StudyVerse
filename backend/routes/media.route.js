<<<<<<< HEAD
import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

// routing for lecture videos
router.route("/upload-video").post(upload.single("file"), async(req,res) => {
    try {
        const result = await uploadMedia(req.file.path);
        res.status(200).json({
            success:true,
            message:"File uploaded successfully.",
            data:result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error uploading file"})
    }
});
=======
import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

// routing for lecture videos
router.route("/upload-video").post(upload.single("file"), async(req,res) => {
    try {
        const result = await uploadMedia(req.file.path);
        res.status(200).json({
            success:true,
            message:"File uploaded successfully.",
            data:result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error uploading file"})
    }
});
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
export default router;