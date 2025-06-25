import { Router } from "express";
import { authorization } from "../middlewares/authorization.middleware.js";
import { TaskController } from "../controllers/task.controller.js";
import passport from "passport";
const taskController = new TaskController();
const router = Router();

router.get("/", taskController.getAll);

router.get("/:tid", taskController.getById);

router.put(
  "/:tid",
  passport.authenticate("jwt"),
  authorization("admin"),
  taskController.update
);
router.post(
  "/",
  passport.authenticate("jwt"),
  authorization("admin"),
  taskController.create
);

router.delete(
  "/:tid",
  passport.authenticate("jwt"),
  authorization("admin"),
  taskController.deleteOne
);
export default router;
