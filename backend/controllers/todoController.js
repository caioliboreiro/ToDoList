const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

async function getProjects(req, res) {
  const { userId } = req.params;
  const projects = await db.selectAllProjectsUser(Number.parseInt(userId));

  res.json(projects);
}

async function getProjectsTasks(req, res) {
  const { userId } = req.params;
  const dbSelection = await db.selectAllProjectsTasksUser(
    Number.parseInt(userId)
  );

  res.json(dbSelection);
}

async function postProject(req, res) {
  const { userId } = req.params;
  const { projectName } = req.body;
  const newProject = await db.insertProject(
    Number.parseInt(userId),
    projectName
  );

  res.status(201).json({
    message: "Project created successfully",
    project: newProject,
  });
}

async function deleteTasks(projectId) {
  await prisma.task.deleteMany({
    where: {
      projectId: projectId,
    },
  });
}

async function deleteProject(req, res) {
  const { projectId } = req.params;
  await db.deleteTasks(Number.parseInt(projectId));
  await db.deleteProject(Number.parseInt(projectId));

  res.sendStatus(200);
}

async function putProject(req, res) {
  const { projectId } = req.params;
  const { name, position } = req.body;
  await db.updateProject(Number.parseInt(projectId), name, position);
  res.sendStatus(200);
}

async function postTask(req, res) {
  const { projectId } = req.params;
  const { checked, title, description, date, priority } = req.body;
  const newTask = await db.insertTask(
    checked,
    title,
    description,
    new Date(date),
    priority,
    Number.parseInt(projectId)
  );

  res.status(201).json({
    message: "Task created succesfully",
    task: newTask,
  });
}

async function deleteTask(req, res) {
  const { taskId } = req.params;

  await db.deleteTask(Number.parseInt(taskId));
  res.sendStatus(200);
}

async function putTask(req, res) {
  const { checked, title, description, date, priority, projectId, position } =
    req.body;
  const { taskId } = req.params;

  const changedTask = await db.updateTask(
    Number.parseInt(taskId),
    checked,
    title,
    description,
    new Date(date),
    priority,
    Number.parseInt(projectId),
    position
  );

  res.status(200).json({
    message: "Task updated succesfully",
    task: changedTask,
  });
}

// Authentication methods
async function registerUser(req, res) {
  try {
    const { first, last, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insertUser(first, last, username, hashedPassword);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

async function authenticateUser(req, res) {
  const { username, password } = req.body;

  const user = await db.findUser(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          first: user.firstName,
          last: user.lastName,
        },
      });
    }
    res.status(401).json({ message: "Password doesn't match!" });
  } else {
    res.status(401).json({ message: "Username not found!" });
  }
}

module.exports = {
  getProjects,
  getProjectsTasks,
  postProject,
  deleteTasks,
  deleteProject,
  putProject,
  postTask,
  deleteTask,
  putTask,
  registerUser,
  authenticateUser,
};
