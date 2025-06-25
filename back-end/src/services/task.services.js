import { taskDao } from "../dao/task.dao.js";
import { TasksDto } from "../dto/tasks.dto.js";
class TaskService {
  async getAll() {
    const tasks = await taskDao.getAll();
    // Si tasks es un array plano:
    const formatTasks = tasks.map((task) => new TasksDto(task));
    return formatTasks;
  }
  async getById(id) {
    const task = await taskDao.getById(id);
    if (!task) return null;

    return new TasksDto(task);
  }
  async deleteOne(id) {
    const task = await taskDao.getById(id);
    if (!task) return null;
    await taskDao.deleteOne(id);
    return true;
  }
  async update(id, data) {
    const task = await taskDao.getById(id);
    if (!task) return null;
    const taskUpdate = await taskDao.update(id, data);
    return taskUpdate;
  }
  async create(data) {
    const task = await taskDao.create(data);
    return task;
  }
}

export const taskService = new TaskService();
