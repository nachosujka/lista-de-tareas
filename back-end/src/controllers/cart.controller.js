import { taskService } from "../services/task.services.js";
import { cartService } from "../services/cart.services.js";

export class CartControler {
  async createCart(req, res) {
    try {
      // Crea el carrito
      const cart = await cartService.create();
      res.status(201).json({ status: "success" }, cart);
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        msg: "Error al agregar el producto al carrito",
      });
    }
  }

  async getCartById(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.getCartById(cid);
      if (!cart)
        return res
          .status(404)
          .json({ status: "Error", msg: "Carrito no encontrado" });
    } catch (error) {
      res
        .status(500)
        .json({ status: "Error", msg: "Error al buscar un carrito" });
    }
  }
  async addTaskToCart(req, res) {
    try {
      const { cid, tid } = req.params;
      const task = await taskService.getById(tid);
      if (!task)
        return res.status(404).json({
          status: "Error",
          msg: `No se encontró la tarea con el id ${tid}`,
        });

      const cart = await cartService.addTaskToCart(cid, tid);
      if (!cart)
        return res.status(404).json({
          status: "Error",
          msg: `No se encontró el carrito con el id ${cid}`,
        });

      res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }
  async deleteTaskToCart(req, res) {
    try {
      const { cid, tid } = req.params;
      const task = await taskService.getById(tid);
      // Encuentra el carrito por su ID
      if (!task)
        return res.status(404).json({ message: "Tarea no encontrada" });

      // Filtra los productos para eliminar el producto especifico
      const cart = await cartService.getById(cid);
      if (!cart)
        return res.status(404).json({ message: "Carrito no encontrado" });
      const cartUpdate = await cartService.deleteTaskToCart(cid, tid);
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar la tarea del carrito" });
    }
  }
  async clearCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartService.clearTasksToCart(cid);
      if (!cart)
        return res
          .status(404)
          .json({ status: "Error", msg: "Carrito no encontrado" });

      res.status(200).json({ status: "success", cart });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error al eliminar el carrito" });
    }
  }
}
