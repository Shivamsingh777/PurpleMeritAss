import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, { dbName: "greencart" });
    console.log("MongoDB connected");
  } catch (e) {
    console.error("DB connect error:", e.message);
    process.exit(1);
  }
};
