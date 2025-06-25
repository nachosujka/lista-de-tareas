import { taskDao } from "../dao/task.dao.js";
import { taskService } from "../services/task.services.js";

export class TaskController {
  async getAll(req, res) {
    try {
      const { limit, page } = req.query;

      const options = {
        limit: limit || 10,
        page: page || 1,
      };

      const tasks = await taskDao.getAll({}, options);
      res.status(200).json({ status: "success", tasks });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async getById(req, res) {
    try {
      const { tid } = req.params;
      const task = await taskService.getById(tid); // Busca la tarea por ID

      if (!task) {
        return res
          .status(404)
          .json({ status: "error", Error: "Tarea no encontrada" });
      }

      res.status(200).json({ status: "success", task }); // Renderiza la vista de detalles de la tarea
    } catch (error) {
      return res.status(500).render("error", {
        Error: "Error al obtener la tarea",
      });
    }
  }

  async update(req, res) {
    try {
      const taskId = req.params.tid;
      const taskData = req.body;
      const task = await taskDao.update(taskId, taskData);
      if (!task)
        return res
          .status(404)
          .json({ status: "Error", msg: "Tarea no encontrada" });

      res.status(200).json({ status: "success", task });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async create(req, res) {
    try {
      const newTaskData = req.body; // Verifica datos enviados desde el formulario
      const newTask = await taskDao.create(newTaskData);

      await newTask.save();
      res.redirect("/tasks");
    } catch (error) {
      return res.render("error", { error: error.message });
    }
  }

  async deleteOne(req, res) {
    try {
      const { tid } = req.params;
      const task = await taskService.deleteOne(tid);
      if (!task) {
        return res
          .status(404)
          .render("error", { error: "Error al eliminar la tarea" });
      }
      res.redirect("tasks");
    } catch (error) {
      return res.render("error", { error: "Error al eliminar la tarea" });
    }
  }
}
