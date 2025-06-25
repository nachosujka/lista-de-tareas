import { Router } from "express";
import cartsRouter from "./carts.router.js";
import sessionRouter from "./sessions.router.js";
import tasksRouter from "./tasks.router.js";

const router = Router();
router.use("/carts", cartsRouter);
router.use("/sessions", sessionRouter);
router.use("/tasks", tasksRouter);
export default router;
