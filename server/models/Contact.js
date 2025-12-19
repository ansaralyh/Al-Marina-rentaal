import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    source: { type: String, default: "website" },
    read: { type: Boolean, default: false },
    readAt: { type: Date },
  },
  { timestamps: true },
);

export const Contact = mongoose.model("Contact", ContactSchema);

