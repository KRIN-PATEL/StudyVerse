import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateCertificate = async (req, res) => {
  try {
    const { name, courseName } = req.query;

    if (!name || !courseName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=certificate.pdf");
    doc.pipe(res);

    const width = doc.page.width;
    const height = doc.page.height;

    // AlexBrush font
    const alexFontPath = path.join(__dirname, "assets", "AlexBrush-Regular.ttf");
    if (fs.existsSync(alexFontPath)) {
      doc.registerFont("AlexBrush", alexFontPath);
    }

    // Fancy Gradient Borders
    const borderColors = ["#3b82f6", "#6366f1", "#8b5cf6"];
    for (let i = 0; i < borderColors.length; i++) {
      doc.save()
        .lineWidth(2)
        .strokeColor(borderColors[i])
        .rect(30 + i * 3, 30 + i * 3, width - 60 - i * 6, height - 60 - i * 6)
        .stroke()
        .restore();
    }

    // Watermark
    doc.fontSize(80)
      .fillColor("#e0f2fe")
      .rotate(-45, { origin: [width / 2, height / 2] })
      .text("STUDYVERSE", 0, height / 3, {
        align: "center",
        width,
      });
    doc.rotate(45, { origin: [width / 2, height / 2] });

    // Main Title
    doc.font("Times-Bold")
      .fontSize(46)
      .fillColor("#1e3a8a")
      .text("Certificate of Achievement", 0, 120, { align: "center" });

    // Subtitle
    doc.font("Times-Italic")
      .fontSize(20)
      .fillColor("#374151")
      .text("This certificate is proudly awarded to", 0, 180, { align: "center" });

    
    doc.font("Times-BoldItalic")
      .fontSize(40)
      .fillColor("#0f172a")
      .text(name, 0, 230, { align: "center" });

    //Course Info
    doc.font("Times-Roman")
      .fontSize(18)
      .fillColor("#374151")
      .text("For the successful completion of the course", 0, 280, { align: "center" });

    doc.font("Times-Bold")
      .fontSize(26)
      .fillColor("#0f172a")
      .text(courseName, 0, 310, { align: "center", underline: true });

    // Extra Message
    doc.font("Times-Italic")
      .fontSize(16)
      .fillColor("#4b5563")
      .text("Your dedication and effort have been truly commendable.", 0, 360, { align: "center" });

    doc.text("We wish you continued success in your learning journey.", {
      align: "center",
    });

    // Footer
    const today = new Date().toLocaleDateString();

    doc.font("Times-Roman")
      .fontSize(14)
      .fillColor("#000")
      .text(`Date: ${today}`, 60, height - 100);

    if (doc._registeredFonts["AlexBrush"]) {
      doc.font("AlexBrush")
        .fontSize(34)
        .fillColor("#1e3a8a")
        .text("StudyVerse", width - 250, height - 120, {
          align: "left",
          lineBreak: false,
        });
    } else {
      doc.font("Times-Italic")
        .fontSize(28)
        .fillColor("#1e3a8a")
        .text("StudyVerse", width - 250, height - 120, {
          align: "left",
          lineBreak: false,
        });
    }

    doc.font("Helvetica-Oblique")
      .fontSize(12)
      .fillColor("#6b7280")
      .text("Authorized Signature", width - 250, height - 90, {
        align: "left",
        lineBreak: false,
      });

    doc.end();
  } catch (error) {
    console.error("Error generating certificate:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};
