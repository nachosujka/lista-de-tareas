import { cartDao } from "../dao/cart.dao.js";
import { taskDao } from "../dao/task.dao.js";

class CartService {
  async createCart() {
    return await cartDao.create();
  }

  async getCartById(id) {
    const cart = await cartDao.getById(id);
    if (!cart) return null;
    return cart;
  }

  async addTaskToCart(cid, tid) {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");
    cart.tasks.push({ task: tid });
    return await cartDao.update(cid, cart);
  }

  async deleteTaskToCart(cid, tid) {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");
    const tasks = cart.tasks.filter((task) => task.task != tid);
    return await taskDao.update(cid, { tasks });
  }

  async clearTasksToCart(id) {
    const cart = await this.getCartById(id);
    cart.tasks = [];
    return await cartDao.update(id, cart);
  }
}

export const cartService = new CartService();
