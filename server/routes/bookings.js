import express from "express";
import { Booking } from "../models/Booking.js";
import { Vehicle } from "../models/Vehicle.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { sendBookingStatusEmail } from "../utils/email.js";

const router = express.Router();

// Create a new booking (public)
// Normalizes field names from the public inquiry form to the Booking model.
router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      vehicle,
      car, // from InquiryPopup
      pickupDate,
      dropoffDate,
      returnDate, // from InquiryPopup
      message,
    } = req.body;

    const booking = new Booking({
      name,
      email,
      phone,
      vehicle: vehicle || car || undefined,
      pickupDate: pickupDate || undefined,
      dropoffDate: dropoffDate || returnDate || undefined,
      message,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

// Get all bookings (Admin only - most recent first)
router.get("/", authenticate, requireAdmin, async (_req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// Update booking status (Admin only)
// Simple admin flow: Pending → Confirmed → Completed / Cancelled
router.patch("/:id/status", authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];
    const normalizedStatus = String(status || "").toLowerCase();

    if (!allowedStatuses.includes(normalizedStatus)) {
      return res
        .status(400)
        .json({ message: "Invalid status value", allowedStatuses });
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { status: normalizedStatus },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Fire-and-forget email notification; don't block response on email errors
    if (["confirmed", "cancelled"].includes(normalizedStatus)) {
      sendBookingStatusEmail(updated).catch((err) => {
        console.error("Error sending booking status email:", err);
      });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Admin dashboard analytics (Admin only)
// Aggregates bookings & vehicles into KPIs and chart series
router.get("/analytics", authenticate, requireAdmin, async (_req, res, next) => {
  try {
    const [vehicles, bookings] = await Promise.all([
      Vehicle.find().lean(),
      Booking.find().lean(),
    ]);

    const totalVehicles = vehicles.length;

    // Quick lookup maps for joins
    const vehicleById = new Map(vehicles.map((v) => [String(v._id), v]));
    const vehicleByName = new Map(
      vehicles.map((v) => [v.name?.toLowerCase?.() || "", v]),
    );

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const WINDOW_DAYS = 30;
    const windowStart = new Date(today);
    windowStart.setDate(windowStart.getDate() - (WINDOW_DAYS - 1));
    const windowEnd = new Date(today);

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const nextMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    );
    const lastMonthStart = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1,
    );
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 1);

    let activeBookings = 0;
    let bookingsThisMonth = 0;
    let bookingsLastMonth = 0;

    let reservedDays = 0;

    const bookingsPerDay = new Map();
    const revenuePerDay = new Map();
    const bookingsByCategory = new Map();
    const bookingsByVehicle = new Map();

    const msPerDay = 1000 * 60 * 60 * 24;

    const clampToWindow = (startDate, endDate) => {
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      const clampedStart = start && start > windowStart ? start : windowStart;
      const effectiveEnd = end || start || windowEnd;
      const clampedEnd = effectiveEnd < windowEnd ? effectiveEnd : windowEnd;

      if (!clampedStart || clampedEnd < clampedStart) return 0;

      return Math.floor((clampedEnd - clampedStart) / msPerDay) + 1;
    };

    const formatDate = (date) => {
      const d = new Date(date);
      const y = d.getFullYear();
      const m = `${d.getMonth() + 1}`.padStart(2, "0");
      const day = `${d.getDate()}`.padStart(2, "0");
      return `${y}-${m}-${day}`;
    };

    // Pre-fill last 30 days for smoother charts
    for (let i = 0; i < WINDOW_DAYS; i += 1) {
      const d = new Date(windowStart);
      d.setDate(windowStart.getDate() + i);
      const key = formatDate(d);
      bookingsPerDay.set(key, 0);
      revenuePerDay.set(key, 0);
    }

    for (const booking of bookings) {
      const createdAt = booking.createdAt ? new Date(booking.createdAt) : null;
      const pickupDate = booking.pickupDate
        ? new Date(booking.pickupDate)
        : null;
      const dropoffDate = booking.dropoffDate
        ? new Date(booking.dropoffDate)
        : null;

      // Active bookings = current or upcoming (dropoff today or later)
      const effectiveDropoff = dropoffDate || pickupDate;
      if (effectiveDropoff && effectiveDropoff >= today) {
        activeBookings += 1;
      }

      if (createdAt) {
        if (createdAt >= monthStart && createdAt < nextMonthStart) {
          bookingsThisMonth += 1;
        } else if (createdAt >= lastMonthStart && createdAt < lastMonthEnd) {
          bookingsLastMonth += 1;
        }

        if (createdAt >= windowStart && createdAt <= windowEnd) {
          const key = formatDate(createdAt);
          bookingsPerDay.set(key, (bookingsPerDay.get(key) || 0) + 1);
        }
      }

      // Utilization over the 30‑day window
      if (pickupDate && pickupDate <= windowEnd) {
        reservedDays += clampToWindow(pickupDate, dropoffDate);
      }

      let vehicleDoc = null;
      if (booking.vehicle) {
        vehicleDoc =
          vehicleById.get(String(booking.vehicle)) ||
          vehicleByName.get(String(booking.vehicle).toLowerCase());
      }

      const category =
        (vehicleDoc?.category || "Unknown").trim() || "Unknown";
      bookingsByCategory.set(
        category,
        (bookingsByCategory.get(category) || 0) + 1,
      );

      const vehicleName =
        vehicleDoc?.name || booking.vehicle || "Unspecified Vehicle";
      bookingsByVehicle.set(
        vehicleName,
        (bookingsByVehicle.get(vehicleName) || 0) + 1,
      );

      // Approximate revenue = rentalDays * pricePerDay
      if (createdAt && vehicleDoc?.pricePerDay && pickupDate) {
        const rentalEnd = dropoffDate || pickupDate;
        const rentalDays =
          Math.floor((rentalEnd - pickupDate) / msPerDay) + 1 || 1;
        const revenue = rentalDays * (vehicleDoc.pricePerDay || 0);

        if (createdAt >= windowStart && createdAt <= windowEnd) {
          const key = formatDate(createdAt);
          revenuePerDay.set(key, (revenuePerDay.get(key) || 0) + revenue);
        }
      }
    }

    const totalAvailableDays =
      totalVehicles > 0 ? totalVehicles * WINDOW_DAYS : 0;
    const fleetUtilization =
      totalAvailableDays > 0
        ? Number(((reservedDays / totalAvailableDays) * 100).toFixed(1))
        : 0;

    let bookingsMoMChange = 0;
    if (bookingsLastMonth === 0 && bookingsThisMonth > 0) {
      bookingsMoMChange = 100;
    } else if (bookingsLastMonth > 0) {
      bookingsMoMChange = Number(
        (((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100)
          .toFixed(1),
      );
    }

    const bookingTrends = Array.from(bookingsPerDay.entries()).map(
      ([date, count]) => ({ date, count }),
    );

    const revenueTrends = Array.from(revenuePerDay.entries()).map(
      ([date, revenue]) => ({ date, revenue }),
    );

    const bookingsByCategoryArr = Array.from(bookingsByCategory.entries()).map(
      ([category, count]) => ({ category, count }),
    );

    const topVehicles = Array.from(bookingsByVehicle.entries())
      .map(([vehicleName, count]) => ({ vehicleName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      kpis: {
        totalVehicles,
        activeBookings,
        fleetUtilization,
        bookingsThisMonth,
        bookingsLastMonth,
        bookingsMoMChange,
      },
      bookingTrends,
      revenueTrends,
      bookingsByCategory: bookingsByCategoryArr,
      topVehicles,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
