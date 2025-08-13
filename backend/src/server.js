import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8080;
await connectDB(process.env.MONGO_URI);
app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
