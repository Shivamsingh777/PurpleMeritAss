import Driver from "../models/Driver.js";
import RouteModel from "../models/Route.js";
import Order from "../models/Order.js";
import Simulation from "../models/Simulation.js";
import Joi from "joi";

const inputSchema = Joi.object({
  numDrivers: Joi.number().integer().min(1).required(),
  routeStartHHMM: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  maxHoursPerDriver: Joi.number().integer().min(1).max(24).required()
});

export const runSimulation = async (payload) => {
  const { error, value } = inputSchema.validate(payload);
  if (error) {
    const err = new Error(error.message);
    err.status = 400;
    throw err;
  }
  const { numDrivers, routeStartHHMM, maxHoursPerDriver } = value;
  const maxMin = maxHoursPerDriver * 60;

  const [driversAll, routes, orders] = await Promise.all([
    Driver.find({}).lean(),
    RouteModel.find({}).lean(),
    Order.find({}).lean()
  ]);
  if (driversAll.length === 0) throw Object.assign(new Error("No drivers in DB"), { status: 400 });
  if (routes.length === 0) throw Object.assign(new Error("No routes in DB"), { status: 400 });
  if (orders.length === 0) throw Object.assign(new Error("No orders in DB"), { status: 400 });

  // pick available drivers: least last-day workload first
  const drivers = [...driversAll]
    .sort((a, b) => (a.last7DaysMinutes?.[6] || 0) - (b.last7DaysMinutes?.[6] || 0))
    .slice(0, Math.min(numDrivers, driversAll.length))
    .map(d => ({
      ...d,
      assignedMin: 0,
      fatigueFactor: (d.last7DaysMinutes?.[6] || 0) > 480 ? 1.3 : 1.0,
      id: String(d._id)
    }));

  const routeMap = new Map(routes.map(r => [r.routeId, r]));
  const ordersEnriched = orders.map(o => {
    const r = routeMap.get(o.routeRef);
    if (!r) return null;
    return { ...o, route: r };
  }).filter(Boolean);

  // Sort orders by base time asc (shortest first)
  ordersEnriched.sort((a, b) => a.route.baseTimeMin - b.route.baseTimeMin);

  let totals = {
    totalProfit: 0,
    onTime: 0,
    late: 0,
    fuelCostTotal: 0,
    penaltiesTotal: 0,
    bonusTotal: 0,
    totalDeliveries: 0
  };
  const details = [];

  for (const order of ordersEnriched) {
    // assign to driver with minimal assigned minutes that can fit
    let bestDriver = null;
    for (const d of drivers) {
      const effectiveTime = Math.round(order.route.baseTimeMin * d.fatigueFactor);
      if (d.assignedMin + effectiveTime <= maxMin) {
        if (!bestDriver || d.assignedMin < bestDriver.assignedMin) bestDriver = d;
      }
    }
    if (!bestDriver) {
      details.push({
        orderId: order.orderId,
        assigned: false,
        reason: "Capacity exceeded"
      });
      continue;
    }

    const effectiveTimeMin = Math.round(order.route.baseTimeMin * bestDriver.fatigueFactor);
    const onTime = effectiveTimeMin <= (order.route.baseTimeMin + 10);
    const penalty = onTime ? 0 : 50;
    const bonus = (onTime && order.valueRs > 1000) ? Math.round(order.valueRs * 0.10) : 0;
    const fuelCost = order.route.distanceKm * (5 + (order.route.trafficLevel === "High" ? 2 : 0));
    const profit = order.valueRs + bonus - penalty - fuelCost;

    bestDriver.assignedMin += effectiveTimeMin;

    totals.totalProfit += profit;
    totals.fuelCostTotal += fuelCost;
    totals.penaltiesTotal += penalty;
    totals.bonusTotal += bonus;
    totals.totalDeliveries += 1;
    if (onTime) totals.onTime += 1; else totals.late += 1;

    details.push({
      orderId: order.orderId,
      driverId: bestDriver.id,
      baseTimeMin: order.route.baseTimeMin,
      effectiveTimeMin,
      onTime,
      valueRs: order.valueRs,
      bonus,
      penalty,
      fuelCost,
      profit,
      routeId: order.route.routeId,
      trafficLevel: order.route.trafficLevel,
      distanceKm: order.route.distanceKm
    });
  }

  const efficiencyScore = totals.totalDeliveries > 0
    ? Number(((totals.onTime / totals.totalDeliveries) * 100).toFixed(2))
    : 0;

  const kpis = {
    totalProfit: Math.round(totals.totalProfit),
    efficiencyScore,
    totalDeliveries: totals.totalDeliveries,
    onTime: totals.onTime,
    late: totals.late,
    fuelCostTotal: Math.round(totals.fuelCostTotal),
    penaltiesTotal: totals.penaltiesTotal,
    bonusTotal: totals.bonusTotal
  };

  const saved = await Simulation.create({
    inputs: { numDrivers, routeStartHHMM, maxHoursPerDriver },
    kpis, details
  });

  return saved.toObject();
};