<<<<<<< HEAD
import mongoose from "mongoose";

// lecture schema
const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
  publicId: { type: String },
  isPreviewFree: { type: Boolean },
},{timestamps:true});

export const Lecture = mongoose.model("Lecture", lectureSchema);
=======
import mongoose from "mongoose";

// lecture schema
const lectureSchema = new mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
  publicId: { type: String },
  isPreviewFree: { type: Boolean },
},{timestamps:true});

export const Lecture = mongoose.model("Lecture", lectureSchema);
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
