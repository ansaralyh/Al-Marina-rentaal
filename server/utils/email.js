import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Ensure environment variables are loaded before reading them,
// since this module can be imported before server/index.js runs dotenv.config().
dotenv.config();

const {
  EMAIL_FROM,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

// Create a reusable transporter if SMTP is configured
let transporter = null;

if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  console.warn(
    "[email] SMTP configuration is missing. Email notifications are disabled."
  );
}

export async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    // Fail silently in production, log in development
    if (process.env.NODE_ENV !== "production") {
      console.warn("[email] sendEmail called but transporter is not configured.");
    }
    return;
  }

  const from = EMAIL_FROM || SMTP_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });
}

export async function sendBookingStatusEmail(booking) {
  if (!booking?.email) return;

  const status = String(booking.status || "").toLowerCase();

  let subject;
  let intro;

  if (status === "confirmed") {
    subject = "Your booking has been confirmed – Marina Rental Car";
    intro = "Good news! Your booking has been <strong>confirmed</strong>.";
  } else if (status === "cancelled") {
    subject = "Your booking has been cancelled – Marina Rental Car";
    intro = "Your booking has been <strong>cancelled</strong>.";
  } else {
    // Only send emails for confirmed/cancelled for now
    return;
  }

  const pickup = booking.pickupDate
    ? new Date(booking.pickupDate).toLocaleString("en-AE", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not specified";

  const dropoff = booking.dropoffDate
    ? new Date(booking.dropoffDate).toLocaleString("en-AE", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Not specified";

  const vehicle = booking.vehicle || "Not specified";

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #111827;">
      <h2 style="color: #111827; font-size: 20px; margin-bottom: 8px;">
        Marina Rental Car
      </h2>
      <p style="margin-bottom: 12px;">
        Hi ${booking.name || "there"},
      </p>
      <p style="margin-bottom: 16px;">
        ${intro}
      </p>
      <div style="background-color: #F9FAFB; padding: 12px 16px; border-radius: 8px; border: 1px solid #E5E7EB; margin-bottom: 16px;">
        <p style="margin: 0 0 4px;"><strong>Vehicle:</strong> ${vehicle}</p>
        <p style="margin: 0 0 4px;"><strong>Pickup:</strong> ${pickup}</p>
        <p style="margin: 0 0 4px;"><strong>Dropoff:</strong> ${dropoff}</p>
        <p style="margin: 0;"><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p>
      </div>
      <p style="margin-bottom: 8px;">
        If you have any questions or need to make changes, feel free to reply to this email.
      </p>
      <p style="margin-top: 16px; color: #6B7280; font-size: 12px;">
        Best regards,<br/>
        Marina Rental Car Team
      </p>
    </div>
  `;

  await sendEmail({
    to: booking.email,
    subject,
    html,
  });
}


