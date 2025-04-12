const { Router } = require("express");
const todoRouter = Router();
const todoController = require("../controllers/todoController");

todoRouter.get("/users/:userId/projectsTasks", todoController.getProjectsTasks);

todoRouter.get("/users/:userId/projects", todoController.getProjects);
todoRouter.post("/users/:userId/projects", todoController.postProject);
todoRouter.delete("/projects/:projectId", todoController.deleteProject);
todoRouter.put("/projects/:projectId", todoController.putProject);

todoRouter.post("/projects/:projectId/tasks", todoController.postTask);
todoRouter.delete("/tasks/:taskId", todoController.deleteTask);
todoRouter.put("/tasks/:taskId", todoController.putTask);

// Authentication Routes
todoRouter.post("/register", todoController.registerUser);
todoRouter.post("/login", todoController.authenticateUser);

module.exports = todoRouter;
