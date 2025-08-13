import mongoose from "mongoose";

const simulationSchema = new mongoose.Schema(
  {
    inputs: {
      numDrivers: Number,
      routeStartHHMM: String,
      maxHoursPerDriver: Number
    },
    kpis: {
      totalProfit: Number,
      efficiencyScore: Number,
      totalDeliveries: Number,
      onTime: Number,
      late: Number,
      fuelCostTotal: Number,
      penaltiesTotal: Number,
      bonusTotal: Number
    },
    details: [{}], // per-order details
  },
  { timestamps: true }
);
export default mongoose.model("Simulation", simulationSchema);
