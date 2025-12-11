import mongoose from "mongoose";
import { slugify } from "../utils/slugify.js";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String },
    content: { type: String },
    category: { type: String },
    author: { type: String },
    tags: [{ type: String }],
    featuredImage: { type: String },
    isFeatured: { type: Boolean, default: false },
    slug: { type: String, unique: true, index: true },
  },
  { timestamps: true },
);

BlogSchema.pre("save", function setSlug(next) {
  if (!this.slug) {
    const base = `${this.title || "blog"}-${this._id}`;
    this.slug = slugify(base);
  }
  next();
});

export const Blog = mongoose.model("Blog", BlogSchema);

