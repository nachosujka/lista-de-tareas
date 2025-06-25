import { Router } from "express";
import { authorization } from "../middlewares/authorization.middleware.js";
import { CartControler } from "../controllers/cart.controller.js";
import passport from "passport";
const cartControler = new CartControler();
const router = Router();

router.use(passport.authenticate("jwt"));

router.post("/", authorization("admin"), cartControler.createCart);

router.get("/:cid", authorization("user"), cartControler.getCartById);

router.post(
  "/:cid/tasks/:tid",
  authorization("user"),
  cartControler.addTaskToCart
);
router.delete(
  "/:cid/tasks/:tid",
  authorization("user"),
  cartControler.deleteTaskToCart
);

router.delete("/:cid", authorization("admin"), cartControler.clearCart);

export default router;
