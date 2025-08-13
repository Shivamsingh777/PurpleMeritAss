import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { simulate, history } from "../controllers/simulationController.js";

const router = Router();
router.use(auth);
router.post("/run", simulate);
router.get("/history", history);
export default router;
