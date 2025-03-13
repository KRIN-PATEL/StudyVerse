<<<<<<< HEAD
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["instructor", "student"], default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    photoUrl: { type: String, default: "" },

    // forgot password fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
=======
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["instructor", "student"], default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    photoUrl: { type: String, default: "" },

    // forgot password fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
