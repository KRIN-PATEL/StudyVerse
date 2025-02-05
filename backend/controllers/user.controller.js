import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req,res) => {
    try {
       
        const {name, email, password} = req.body; 
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            success:true,
            message:"Account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
}
export const login = async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}
export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}
export const getUserProfile = async (req,res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to load user"
        })
    }
}
export const updateProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            }) 
        }
        // extract public id of the old image from the url is it exists;
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name, photoUrl};
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        })
    }
}

//forgot testing

import { sendEmail } from "../utils/mailer.js";

// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (!email) {
//             return res.status(400).json({ success: false, message: "Email is required." });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ success: false, message: "User not found with this email." });
//         }

//         // Generate OTP
//         const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
//         const hashedOTP = await bcrypt.hash(otp, 10); // Hash the OTP

//         user.resetPasswordToken = hashedOTP;
//         user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
//         await user.save();

//         // Send OTP Email
//         await sendEmail(user.email, "Password Reset OTP", `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`);

//         return res.status(200).json({ success: true, message: "OTP sent to your email." });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Failed to send OTP." });
//     }
// };




// export const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;
//         if (!email) {
//             return res.status(400).json({ success: false, message: "Email is required." });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ success: false, message: "User not found with this email." });
//         }

//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         const hashedOTP = await bcrypt.hash(otp, 10);

//         user.resetPasswordToken = hashedOTP;
//         user.resetPasswordExpires = Date.now() + 2 * 60 * 1000;
//         await user.save();

//         console.log("Generated OTP:", otp);
//         await sendEmail(user.email, otp);

//         return res.status(200).json({ success: true, message: "OTP sent to your email." });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Failed to send OTP." });
//     }
// };

export const verifyOTP = async (req, res) => {
  try {
      const { email, otp } = req.body;
      if (!email || !otp) {
          return res.status(400).json({ success: false, message: "Email and OTP are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: "Invalid OTP." });
      }

      if (user.resetPasswordExpires < Date.now()) {
          return res.status(400).json({ success: false, message: "OTP expired." });
      }

      const isMatch = await bcrypt.compare(otp, user.resetPasswordToken);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: "Invalid OTP." });
      }

      return res.status(200).json({ success: true, message: "OTP verified successfully." });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to verify OTP." });
  }
};

export const forgotPassword = async (req, res) => {
  try {
      const { email } = req.body;
      if (!email) {
          return res.status(400).json({ success: false, message: "Email is required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: "User not found with this email." });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOTP = await bcrypt.hash(otp, 10);

      user.resetPasswordToken = hashedOTP;
      user.resetPasswordExpires = Date.now() + 2 * 60 * 1000;
      await user.save();

      console.log("Generated OTP:", otp);
      await sendEmail(user.email, user.name, otp);

      return res.status(200).json({ success: true, message: "OTP sent to your email." });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
};


export const resetPassword = async (req, res) => {
  try {
      const { email, otp, newPassword } = req.body;
      if (!email || !otp || !newPassword) {
          return res.status(400).json({ success: false, message: "All fields are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ success: false, message: "Invalid OTP." });
      }

      if (user.resetPasswordExpires < Date.now()) {
          return res.status(400).json({ success: false, message: "OTP expired." });
      }

      const isMatch = await bcrypt.compare(otp, user.resetPasswordToken);
      if (!isMatch) {
          return res.status(400).json({ success: false, message: "Invalid OTP." });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.status(200).json({ success: true, message: "Password reset successful." });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to reset password." });
  }
};
