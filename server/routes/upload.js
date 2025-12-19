import express from "express";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { uploadVehicleImages, uploadBlogImage, getFileUrl } from "../middleware/upload.js";

const router = express.Router();

// Upload vehicle images (multiple)
router.post("/vehicles", authenticate, requireAdmin, uploadVehicleImages, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileUrls = req.files.map((file) => getFileUrl(file.filename, "vehicle"));

    res.json({
      message: "Files uploaded successfully",
      files: req.files.map((file) => ({
        filename: file.filename,
        originalName: file.originalname,
        url: getFileUrl(file.filename, "vehicle"),
      })),
      urls: fileUrls,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error uploading files" });
  }
});

// Upload blog image (single)
router.post("/blogs", authenticate, requireAdmin, uploadBlogImage, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = getFileUrl(req.file.filename, "blog");

    res.json({
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
      },
      url: fileUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error uploading file" });
  }
});

// Delete uploaded file
router.delete("/:type/:filename", authenticate, requireAdmin, (req, res) => {
  try {
    const { type, filename } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const folder = type === "blog" ? "blogs" : "vehicles";
    const filePath = path.join(__dirname, "../uploads", folder, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: "File deleted successfully" });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting file" });
  }
});

export default router;

