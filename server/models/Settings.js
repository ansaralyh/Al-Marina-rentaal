import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    // General Settings
    siteName: { type: String, default: "Marina Rental Car" },
    siteDescription: { type: String, default: "Premium luxury car rental service across the UAE" },
    adminEmail: { type: String, default: "almarinarentacar@gmail.com" },
    
    // Contact Information
    contactEmail: { type: String, default: "almarinarentacar@gmail.com" },
    phone: { type: String, default: "+971 50 209 3966" },
    address: { type: String, default: "Empire Heights Area, Downtown, Business Bay, Dubai, UAE" },
    
    // Blog Settings
    timezone: { type: String, default: "Asia/Dubai" },
    language: { type: String, default: "en" },
    blogPostsPerPage: { type: Number, default: 10 },
    enableComments: { type: Boolean, default: false },
    enableNewsletter: { type: Boolean, default: true },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Ensure only one settings document exists
SettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

SettingsSchema.statics.updateSettings = async function (updates) {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create(updates);
  } else {
    Object.assign(settings, updates);
    await settings.save();
  }
  return settings;
};

export const Settings = mongoose.model("Settings", SettingsSchema);

