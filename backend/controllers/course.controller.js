import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";

import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "course title and category is required " });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to create course !!",
    });
  }
};

export const searchCourse = async (req, res) => {
  try {
    let { query = "", categories = [], sortByPrice = "", page = 1, limit = 5 } = req.query;

    if (typeof categories === "string") {
      categories = [categories];
    }

    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const searchCriteria = {
      isPublished: true,
    };

    if (query) {
      searchCriteria.$or = [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
      ];
    }

    if (categories.length > 0) {
      searchCriteria.$and = categories.map((cat) => ({
        category: { $regex: `^${cat}$`, $options: "i" },
      }));
    }

    const sortOptions = {};
    if (sortByPrice === "low") sortOptions.coursePrice = 1;
    else if (sortByPrice === "high") sortOptions.coursePrice = -1;

    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Course.countDocuments(searchCriteria);

    return res.status(200).json({
      success: true,
      courses: courses || [],
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error in searchCourse:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getPublishedCourse = async (_,res) => {
  try {
      const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"});
      if(!courses){
          return res.status(404).json({
              message:"Course not found"
          })
      }
      return res.status(200).json({
          courses,
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to get published courses"
      })
  }
}
export const rateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating } = req.body;
    const userId = req.id;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user purchased the course
    const purchase = await CoursePurchase.findOne({ userId, courseId, status: "completed" });
    if (!purchase) {
      return res.status(403).json({ message: "Only students who purchased the course can rate it" });
    }

    // Check if already rated
    const alreadyRated = course.ratings.find(r => r.userId.toString() === userId);
    if (alreadyRated) {
      return res.status(400).json({ message: "You already rated this course" });
    }

    // Push new rating
    course.ratings.push({ userId, rating });

    // Update average
    const total = course.ratings.reduce((sum, r) => sum + r.rating, 0);
    course.averageRating = total / course.ratings.length;

    await course.save();

    return res.status(200).json({ message: "Thanks for your feedback!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to rate course" });
  }
};
// Controller: Get All Courses for Admin
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({ path: "creator", select: "name photoUrl" })
      .sort({ createdAt: -1 }); 

    if (!courses) {
      return res.status(404).json({
        message: "No courses found!",
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

export const getAllCourseReviews = async (req, res) => {
  try {
    const courses = await Course.find({ "ratings.0": { $exists: true } })
      .populate("creator", "name photoUrl")
      .populate("ratings.userId", "name photoUrl")
      .select("courseTitle courseThumbnail ratings creator");

    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get course reviews" });
  }
};
export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: "No courses found",
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to get course ",
    });
  }
};
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    // Remove all lectures associated with the course
    await Lecture.deleteMany({ _id: { $in: course.lectures } });

    // Remove the course itself
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({ message: "Course deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to delete course" });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    let courseThumbnail = course.courseThumbnail;

    if (thumbnail) {
      // Delete old thumbnail from Cloudinary if exists
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      // Upload new thumbnail
      const uploadResponse = await uploadMedia(thumbnail.path);
      courseThumbnail = uploadResponse.secure_url;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json({ course, message: "Course updated successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to edit course!" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course by id",
    });
  }
};

// create lecture
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title is required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
    });
  }
};

//get lecture
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
    });
  }
};

// edit lecture
export const editLecture = async (req,res) => {
  try {
      const {lectureTitle, videoInfo, isPreviewFree} = req.body;
      
      const {courseId, lectureId} = req.params;
      const lecture = await Lecture.findById(lectureId);
      if(!lecture){
          return res.status(404).json({
              message:"Lecture not found!"
          })
      }

      // update lecture
      if(lectureTitle) lecture.lectureTitle = lectureTitle;
      if(videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
      if(videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
      lecture.isPreviewFree = isPreviewFree;

      await lecture.save();

      // Ensure the course still has the lecture id if it was not aleardy added;
      const course = await Course.findById(courseId);
      if(course && !course.lectures.includes(lecture._id)){
          course.lectures.push(lecture._id);
          await course.save();
      };
      return res.status(200).json({
          lecture,
          message:"Lecture updated successfully."
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to edit lectures"
      })
  }
}

// remove lecture
export const removeLecture = async (req,res) => {
  try {
      const {lectureId} = req.params;
      const lecture = await Lecture.findByIdAndDelete(lectureId);
      if(!lecture){
          return res.status(404).json({
              message:"Lecture not found!"
          });
      }
      // delete the lecture from couldinary as well
      if(lecture.publicId){
          await deleteVideoFromCloudinary(lecture.publicId);
      }

      // Remove the lecture reference from the associated course
      await Course.updateOne(
          {lectures:lectureId}, 
          {$pull:{lectures:lectureId}} 
      );

      return res.status(200).json({
          message:"Lecture removed successfully."
      })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to remove lecture"
      })
  }
}

// get lecture by id
export const getLectureById = async (req,res) => {
  try {
      const {lectureId} = req.params;
      const lecture = await Lecture.findById(lectureId);
      if(!lecture){
          return res.status(404).json({
              message:"Lecture not found!"
          });
      }
      return res.status(200).json({
          lecture
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to get lecture by id"
      })
  }
}


// publich unpublish course logic

export const togglePublishCourse = async (req,res) => {
  try {
      const {courseId} = req.params;
      const {publish} = req.query; // true, false
      const course = await Course.findById(courseId);
      if(!course){
          return res.status(404).json({
              message:"Course not found!"
          });
      }
      // publish status based on the query paramter
      course.isPublished = publish === "true";
      await course.save();

      const statusMessage = course.isPublished ? "Published" : "Unpublished";
      return res.status(200).json({
          message:`Course is ${statusMessage}`
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message:"Failed to update status"
      })
  }
}

