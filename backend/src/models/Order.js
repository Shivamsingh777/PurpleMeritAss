import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    valueRs: { type: Number, required: true },
    routeRef: { type: String, required: true }, // Route.routeId
    deliveryTimestamp: { type: Date, required: true }
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
