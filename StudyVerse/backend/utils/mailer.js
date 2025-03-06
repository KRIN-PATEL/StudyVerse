import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendEmail = async (to, name, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"StudyVerse Support" <${process.env.SMTP_EMAIL}>`,
    to,
    subject: "StudyVerse - Password Reset OTP",
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f1f8ff; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; padding: 20px; background-color: #007bff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                    <img src="cid:studyverse_logo" alt="StudyVerse Logo" width="180">
                </div>
                <div style="padding: 20px; text-align: center;">
                    <h2 style="color: #007bff;">Password Reset Request</h2>
                    <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
                    <p style="font-size: 16px; color: #555;">We received a request to reset your password for your StudyVerse account.</p>
                    <p style="font-size: 22px; font-weight: bold; text-align: center; color: #ffffff; background: #007bff; padding: 10px 20px; border-radius: 5px; display: inline-block;">Your OTP: ${otp}</p>
                    <p style="font-size: 16px; color: #555; margin-top: 20px;">This OTP is valid for <strong>2 minutes</strong>. If you did not request this, please ignore this email.</p>
                    <p style="font-size: 16px; color: #555;">For security reasons, do not share your OTP with anyone.</p>
                </div>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px;">
                <p style="font-size: 14px; text-align: center; color: #777;">Best Regards,<br>StudyVerse Support Team</p>
            </div>
        `,
    attachments: [
      {
        filename: "cover.png",
        path: path.join(__dirname, "../assets/cover.png"),
        cid: "studyverse_logo",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
  }
};
