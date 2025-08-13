import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["manager"], default: "manager" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
