import mongoose from "mongoose";
const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    currentShiftMinutes: { type: Number, default: 0 },     // today so far
    last7DaysMinutes: { type: [Number], default: [] }      // [d-6, ..., d-1]
  },
  { timestamps: true }
);
export default mongoose.model("Driver", driverSchema);
