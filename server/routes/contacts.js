import express from "express";
import { Contact } from "../models/Contact.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

// Get all contacts (Admin only)
router.get("/", authenticate, requireAdmin, async (_req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

// Get single contact (Admin only)
router.get("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

// Mark contact as read/unread (Admin only)
router.patch("/:id/read", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { read } = req.body;
    const updateData = { read: read === true || read === "true" };
    
    if (updateData.read) {
      updateData.readAt = new Date();
    } else {
      updateData.readAt = null;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    next(err);
  }
});

// Delete contact (Admin only)
router.delete("/:id", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;

