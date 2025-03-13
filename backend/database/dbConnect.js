<<<<<<< HEAD
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("ERROR");
  }
};

export default connectDB;
=======
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("ERROR");
  }
};

export default connectDB;
>>>>>>> 7910057a (Updated code for krinSprint3 branch)
