import mongoose from "mongoose";

const defaultUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://aliyasmuhammad1122:aliyassajid@cluster0.cifooiu.mongodb.net/alimarina";

export const connectDB = async () => {
  const uri = defaultUri;

  if (!uri) {
    throw new Error("MongoDB connection string is missing.");
  }

  await mongoose.connect(uri, {
    dbName: "marinarentalcar",
  });

  // Optional: log successful connection details
  const { host, port, name } = mongoose.connection;
  console.log(`MongoDB Connected: ${host}:${port}`);
  console.log(`Database: ${name}`);
};

