import express from "express";
import { Vehicle } from "../models/Vehicle.js";

const router = express.Router();

// Get all vehicles
router.get("/", async (_req, res, next) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
});

// Get single vehicle by slug or id
router.get("/:idOrSlug", async (req, res, next) => {
  try {
    const { idOrSlug } = req.params;
    const vehicle =
      (await Vehicle.findOne({ slug: idOrSlug })) ||
      (await Vehicle.findById(idOrSlug));

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (err) {
    next(err);
  }
});

// Create vehicle
router.post("/", async (req, res, next) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
});

// Update vehicle
router.put("/:id", async (req, res, next) => {
  try {
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete vehicle
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;

