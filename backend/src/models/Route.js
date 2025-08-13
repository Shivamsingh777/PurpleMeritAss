import mongoose from "mongoose";
const routeSchema = new mongoose.Schema(
  {
    routeId: { type: String, required: true, unique: true },
    distanceKm: { type: Number, required: true },
    trafficLevel: { type: String, enum: ["Low", "Medium", "High"], required: true },
    baseTimeMin: { type: Number, required: true } // route base duration in minutes
  },
  { timestamps: true }
);
export default mongoose.model("Route", routeSchema);
