import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    vehicle: { type: String },
    pickupDate: { type: Date },
    dropoffDate: { type: Date },
    message: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

export const Booking = mongoose.model("Booking", BookingSchema);

