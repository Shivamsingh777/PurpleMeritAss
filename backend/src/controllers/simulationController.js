import { runSimulation } from "../services/simulationService.js";
import Simulation from "../models/Simulation.js";

export const simulate = async (req, res, next) => {
  try {
    const result = await runSimulation(req.body);
    res.status(201).json(result);
  } catch (e) { next(e); }
};

export const history = async (req, res, next) => {
  try {
    const docs = await Simulation.find({}).sort({ createdAt: -1 }).limit(50).lean();
    res.json(docs);
  } catch (e) { next(e); }
};