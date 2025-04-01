// import Stripe from "stripe";
// import { Course } from "../models/course.model";
// import { CoursePurchase } from "../models/coursePurchase.model";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;

//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     const newPurchase = new CoursePurchase({
//       courseId,
//       userId,
//       amount: course.coursePrice,
//       status: "pending",
//     });
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "CAD",
//             product_data: {
//               name: course.courseTitle,
//               images: [course.courseThumbnail],
//             },
//             unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
//       cancel_url: `http://localhost:5173/course-detail/${courseId}`,
//       metadata: {
//         courseId: courseId,
//         userId: userId,
//       },
//       shipping_address_collection: {
//         allowed_countries: ["CAN"],
//       },
//     });
//     if (!session.url) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Error while creating session" });
//     }

//     // Save the purchase record
//     newPurchase.paymentId = session.id;
//     await newPurchase.save();

//     return res.status(200).json({
//       success: true,
//       url: session.url, // Return the Stripe checkout URL
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };



import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { sendInvoiceEmail } from "../utils/mailer.js"; // update the path if your file is elsewhere

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create a new course purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `http://localhost:5173/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["CA"], // Optionally restrict allowed countries
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

// Update user's enrolledCourses
await User.findByIdAndUpdate(
  purchase.userId,
  { $addToSet: { enrolledCourses: purchase.courseId._id } },
  { new: true }
);

// Update course to add user ID to enrolledStudents
await Course.findByIdAndUpdate(
  purchase.courseId._id,
  { $addToSet: { enrolledStudents: purchase.userId } },
  { new: true }
);

// ✅ Send Invoice Email
const user = await User.findById(purchase.userId);

// if (user && user.email && purchase.courseId) {
//   await sendInvoiceEmail(
//     user.email,
//     user.name || "Student",
//     purchase.courseId.courseTitle,
//     purchase.amount
//   );
if (user && user.email && purchase.courseId) {
  await sendInvoiceEmail(
    user.email,
    user.name || "Student",
    purchase.courseId.courseTitle,
    purchase.amount,
    purchase.paymentId
  );
}

    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};
// export const getCourseDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const course = await Course.findById(courseId)
//       .populate({ path: "creator" })
//       .populate({ path: "lectures" });

//     const purchased = await CoursePurchase.findOne({ userId, courseId });
//     console.log(purchased);

//     if (!course) {
//       return res.status(404).json({ message: "course not found!" });
//     }

//     return res.status(200).json({
//       course,
//       purchased: !!purchased, // true if purchased, false otherwise
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId });

    // Check if user already rated the course
    const userRating = course.ratings.find(r => r.userId.toString() === userId);
    const isRatedByUser = !!userRating;
    const userRatingValue = userRating?.rating || 0;

    return res.status(200).json({
      course: {
        ...course.toObject(),
        numberOfRatings: course.ratings.length,
        isRatedByUser,
        userRatingValue,
      },
      purchased: !!purchased,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get course details" });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Monthly Enrollments & Revenue
    const monthlyStats = await CoursePurchase.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" },
          enrollments: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const courseEnrollmentData = monthlyStats.map((stat) => ({
      month: monthNames[stat._id],
      enrollments: stat.enrollments,
    }));

    const revenueData = monthlyStats.map((stat) => ({
      month: monthNames[stat._id],
      revenue: stat.revenue,
    }));

    // Course Category Distribution
    const courseCategoryData = await Course.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: "$category",
          value: { $sum: 1 },
        },
      },
    ]).then((data) =>
      data.map((entry) => ({
        category: entry._id,
        value: entry.value,
      }))
    );

    // Monthly Active Users (based on purchases)
    const monthlyUsers = await CoursePurchase.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          month: "$_id",
          users: { $size: "$users" },
        },
      },
      { $sort: { month: 1 } },
    ]);

    const monthlyActiveUsersData = monthlyUsers.map((stat) => ({
      month: monthNames[stat.month],
      users: stat.users,
    }));

    return res.status(200).json({
      courseEnrollmentData,
      revenueData,
      courseCategoryData,
      monthlyActiveUsersData,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};