import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@marinarental.com" });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: "Admin User",
      email: "admin@marinarental.com",
      password: "admin123", // Will be hashed automatically
      role: "admin",
      isActive: true,
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@marinarental.com");
    console.log("Password: admin123");
    console.log("\n⚠️  Please change the password after first login!");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();

