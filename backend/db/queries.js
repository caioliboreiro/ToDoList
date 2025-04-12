const { prisma } = require("../lib/prisma");

async function selectAllProjectsUser(userId) {
  const rows = await prisma.project.findMany({
    where: {
      userId: userId,
    },
  });

  return rows;
}

async function selectAllProjectsTasksUser(userId) {
  const result = await prisma.project.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      position: true,
      tasks: {
        select: {
          id: true,
          checked: true,
          title: true,
          description: true,
          date: true,
          priority: true,
          position: true,
        },
        orderBy: { position: "asc" },
      },
    },
    orderBy: {
      position: "asc",
    },
  });

  return result;
}

async function selectAllTasksProject(projectId) {
  const rows = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
  });

  return rows;
}

async function selectFirstProjectUser(userId) {
  const rows = await prisma.project.findFirst({
    where: {
      userId: userId,
    },
  });

  return rows;
}

async function insertProject(userId, name) {
  const result = await prisma.project.create({
    data: {
      name: name,
      userId: userId,
    },
  });

  return result;
}

async function deleteProject(projectId) {
  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
}

async function deleteTasks(id) {
  await prisma.task.deleteMany({
    where: {
      projectId: id,
    },
  });
}

async function updateProject(projectId, name, position) {
  await prisma.project.update({
    data: {
      name: name,
      position: position,
    },
    where: {
      id: projectId,
    },
  });
}

async function insertTask(
  checked,
  title,
  description,
  date,
  priority,
  projectId
) {
  const result = prisma.task.create({
    data: {
      checked: checked,
      title: title,
      description: description,
      date: date,
      priority: priority,
      projectId: projectId,
    },
  });

  return result;
}

async function deleteTask(taskId) {
  await prisma.task.deleteMany({
    where: {
      id: taskId,
    },
  });
}

async function updateTask(
  taskId,
  checked,
  title,
  description,
  date,
  priority,
  projectId,
  position
) {
  const changedTask = await prisma.task.update({
    data: {
      checked: checked,
      title: title,
      description: description,
      date: date,
      priority: priority,
      projectId: projectId,
      position: position,
    },
    where: {
      id: taskId,
    },
  });

  return changedTask;
}

async function insertUser(first, last, username, hashedPassword) {
  const user = await prisma.user.create({
    data: {
      firstName: first,
      lastName: last,
      username: username,
      password: hashedPassword,
    },
  });

  return user;
}

async function findUser(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  return user;
}

module.exports = {
  selectAllProjectsUser,
  selectAllProjectsTasksUser,
  selectAllTasksProject,
  selectFirstProjectUser,
  insertProject,
  deleteProject,
  deleteTasks,
  updateProject,
  insertTask,
  deleteTask,
  updateTask,
  insertUser,
  findUser,
};
