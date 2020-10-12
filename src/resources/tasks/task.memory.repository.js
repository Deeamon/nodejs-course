const tasks = [];

const getTasksDB = () => [...tasks];

const saveTaskDB = task => {
  tasks.push(task);
  tasks.sort((a, b) => a.order - b.order);
  return tasks.find(({ id }) => id === task.id);
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

module.exports = {
  getTasksDB,
  saveTaskDB,
  updateTaskDB,
  removeTaskDB,
  removeBoardTaskDB,
  unassignTasksDB
};
