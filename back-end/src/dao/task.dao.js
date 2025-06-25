import taskModel from "../models/tasks.model.js";

class TaskDao {
  async getAll(page = 1, limit = 10) {
    const tasks = await taskModel.paginate({}, { page, limit });
    return tasks;
  }

  async create(data) {
    const task = await taskModel.create(data);
    return task;
  }

  async getById(id) {
    const task = await taskModel.findById(id);
    return task;
  }

  async update(id, data) {
    const taskUpdate = await taskModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return taskUpdate;
  }

  async deleteOne(id) {
    const task = await taskModel.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return task;
  }
}

export const taskDao = new TaskDao();
