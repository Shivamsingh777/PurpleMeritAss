import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../config/db.js";
import Driver from "../models/Driver.js";
import RouteModel from "../models/Route.js";
import Order from "../models/Order.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(fs.readFileSync(path.join(__dirname, p), "utf-8"));

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  await Promise.all([Driver.deleteMany({}), RouteModel.deleteMany({}), Order.deleteMany({})]);

  await Driver.insertMany(read("./drivers.json"));
  await RouteModel.insertMany(read("./routes.json"));
  await Order.insertMany(read("./orders.json"));

  console.log("Seeded drivers/routes/orders");
  process.exit(0);
};
run();