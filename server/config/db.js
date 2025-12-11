import mongoose from "mongoose";

const defaultUri =
  process.env.MONGODB_URI ||
  "mongodb+srv://dbUser:Almarina123@rentalcar.jyxyb5e.mongodb.net/marinarentalcar?retryWrites=true&w=majority&appName=RentalCar";

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

