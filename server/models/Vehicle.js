import mongoose from "mongoose";
import { slugify } from "../utils/slugify.js";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false },
);

const VehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    type: { type: String, default: "Sedan" },
    category: { type: String, default: "Luxury" },
    bodyType: { type: String },
    fuelType: { type: String },
    availability: { type: String, default: "Available" },
    pricePerDay: { type: Number, default: 0 },
    deposit: { type: Number, default: 0 },
    doors: { type: Number },
    seats: { type: Number },
    luggage: { type: Number },
    transmission: { type: String },
    mileage: { type: String },
    engine: { type: String },
    horsepower: { type: String },
    acceleration: { type: String },
    description: { type: String },
    features: [{ type: String }],
    images: { type: [ImageSchema], default: [] },
    slug: { type: String, unique: true, index: true },
  },
  { timestamps: true },
);

VehicleSchema.pre("save", function setSlug(next) {
  if (!this.slug) {
    const base = `${this.make || ""}-${this.model || ""}-${this.year || ""}-${this._id}`.trim();
    this.slug = slugify(base);
  }
  if (this.images?.length) {
    // ensure exactly one primary
    const hasPrimary = this.images.some((img) => img.isPrimary);
    if (!hasPrimary) {
      this.images[0].isPrimary = true;
    } else {
      let primarySet = false;
      this.images = this.images.map((img) => {
        if (img.isPrimary && !primarySet) {
          primarySet = true;
          return img;
        }
        return { ...img, isPrimary: false };
      });
    }
  }
  next();
});

export const Vehicle = mongoose.model("Vehicle", VehicleSchema);

