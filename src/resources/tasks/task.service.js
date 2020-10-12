const Task = require('./task.model');
const {
  getTasksDB,
  saveTaskDB,
  updateTaskDB,
  removeTaskDB,
  removeBoardTaskDBB
} = require('./task.memory.repository');

const getTasks = async boardId => {
  const tasks = await getTasksDB();
  return tasks.filter(task => task.boardId === boardId);
};

const addTask = async (boardId, taskData) =>
  await saveTaskDB(new Task({ ...taskData, boardId }));

const getTask = async (boardId, taskId) => {
  const tasks = await getTasks(boardId);
  if (!tasks.length) return null;
  return tasks.find(task => task.id === taskId);
};

const updateTask = async (boardId, taskId, taskData) => {
  const task = await getTask(boardId, taskId);
  if (!task === undefined) return null;
  const updatedTask = Object.assign({}, task, taskData);
  return await updateTaskDB(updatedTask);
};

const removeTask = async (boardId, taskId) => {
  const task = await getTask(boardId, taskId);
  if (!task) return null;

  return removeTaskDB(taskId);
};

const removeBoardTasks = async boardId => await removeBoardTaskDBB(boardId);

module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
  removeTask,
  removeBoardTasks
};
