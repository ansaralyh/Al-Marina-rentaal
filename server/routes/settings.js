import express from "express";
import { Settings } from "../models/Settings.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get settings (Admin only)
router.get("/", authenticate, requireAdmin, async (_req, res, next) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

// Update settings (Admin only)
router.put("/", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const updates = req.body;
    const settings = await Settings.updateSettings(updates);
    res.json(settings);
  } catch (err) {
    next(err);
  }
});

export default router;

