import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

//   const mailOptions = {
//     from: `"${name}" <${email}>`,
//     to: process.env.SMTP_EMAIL,
//     subject: `New Contact Form Message from ${name}`,
//     html: `
//       <div style="font-family: Arial, sans-serif;">
//         <h3>New Contact Form Submission</h3>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message}</p>
//       </div>
//     `,
//   };
const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.SMTP_EMAIL,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; background-color: #f1f8ff; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding: 20px; background-color: #007bff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          <img src="cid:studyverse_logo" alt="StudyVerse Logo" width="180">
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #007bff; text-align: center;">New Contact Form Submission</h2>
          <p style="font-size: 16px; color: #333;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 16px; color: #333;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
          <p style="font-size: 16px; color: #333;"><strong>Message:</strong></p>
          <div style="padding: 10px 15px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 6px; margin-top: 10px;">
            <p style="font-size: 15px; color: #444; white-space: pre-line;">${message}</p>
          </div>
        </div>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px;">
        <p style="font-size: 14px; text-align: center; color: #777;">You received this message via the StudyVerse contact form.<br>StudyVerse Support Team</p>
      </div>
    `,
    attachments: [
      {
        filename: "cover.png",
        path: path.join(__dirname, "../assets/cover.png"),
        cid: "studyverse_logo", // Referenced in the <img src="cid:studyverse_logo">
      },
    ],
  };
  
  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending contact form email:", error);
    return res.status(500).json({ error: "Failed to send message." });
  }
};
