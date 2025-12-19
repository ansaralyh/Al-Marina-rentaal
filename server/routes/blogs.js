import express from "express";
import { Blog } from "../models/Blog.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

router.get("/:idOrSlug", async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const blog =
      (await Blog.findOne({ slug: idOrSlug })) || (await Blog.findById(idOrSlug));
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

// Create blog (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
});

// Update blog (Admin only)
router.put("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete blog (Admin only)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;

