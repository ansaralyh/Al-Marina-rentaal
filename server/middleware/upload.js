import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../uploads");
const vehiclesDir = path.join(uploadsDir, "vehicles");
const blogsDir = path.join(uploadsDir, "blogs");

[uploadsDir, vehiclesDir, blogsDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine destination based on route or field name
    if (file.fieldname === "vehicleImages") {
      cb(null, vehiclesDir);
    } else if (file.fieldname === "blogImage") {
      cb(null, blogsDir);
    } else {
      cb(null, uploadsDir);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, "-");
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, gif, webp) are allowed!"));
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// Middleware for multiple vehicle images
export const uploadVehicleImages = upload.array("vehicleImages", 10); // Max 10 images

// Middleware for single blog image
export const uploadBlogImage = upload.single("blogImage");

// Helper to get file URL
export const getFileUrl = (filename, type = "vehicle") => {
  const baseUrl = process.env.API_URL || "http://localhost:5000";
  const folder = type === "blog" ? "blogs" : "vehicles";
  return `${baseUrl}/uploads/${folder}/${filename}`;
};

