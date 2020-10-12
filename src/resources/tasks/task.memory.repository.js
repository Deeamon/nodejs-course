const tasks = [];

const getTasksDB = () => [...tasks];

const saveTaskDB = async task => {
  const tasksStore = await getTasksDB();
  tasksStore.push(task);
  tasksStore.sort((a, b) => a.order - b.order);
  await saveTasksDB(tasksStore);
  return tasksStore.find(({ id }) => id === task.id);
};

const saveTasksDB = async tasksData => {
  tasks.splice(0, tasks.length, ...tasksData);
};

const updateTaskDB = taskData => {
  tasks.splice(
    tasks.findIndex(({ id }) => id === taskData.id),
    1,
    taskData
  );
  tasks.sort((a, b) => a.order - b.order);
  return tasks.find(({ id }) => id === taskData.id);
};

const removeTaskDB = taskId => {
  tasks.splice(
    tasks.findIndex(({ id }) => id === taskId),
    1
  );
  return 'Task successfully deleted!';
};

const removeBoardTaskDB = boardId => {
  tasks.splice(
    0,
    tasks.length,
    ...tasks.filter(task => task.boardId !== boardId)
  );
};

const unassignTasksDB = userId => {
  tasks.forEach(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
  return 'Task unassigned!';
};

const getBoardTasksDB = async boardId => {
  try {
    const tasksArr = await getTasksDB();
    const boardTasks = tasksArr.filter(task => task.boardId === boardId);

    if (boardTasks.length === 0) {
      throw {
        status: 404,
        message: 'There are no tasks on the specified board!'
      };
    }

    return boardTasks;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't get tasks because: ${message}`
    };
  }
};

module.exports = {
  getTasksDB,
  getBoardTasksDB,
  saveTaskDB,
  saveTasksDB,
  updateTaskDB,
  removeTaskDB,
  removeBoardTaskDB,
  unassignTasksDB
};
