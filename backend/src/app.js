import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import driverRoutes from "./routes/drivers.js";
import routeRoutes from "./routes/routes.js";
import orderRoutes from "./routes/orders.js";
import simulationRoutes from "./routes/simulations.js";
import { errorHandler, notFound } from "./middleware/error.js";

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, service: "greencart-api" }));

app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/simulations", simulationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;