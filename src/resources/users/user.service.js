const {
  getAllUsersDB,
  saveUserToDB,
  updateUserDB,
  removeUserDB
} = require('./user.memory.repository');
const { unassignUser } = require('../tasks/task.service');

const User = require('./user.model');

const getAll = async () => {
  const users = await getAllUsersDB();
  return users.map(User.removePass);
};

const save = async userData => await saveUserToDB(new User(userData));

const get = async userId => {
  try {
    const users = await getAll();
    const user = users.find(({ id }) => id === userId);

    if (!user) {
      throw {
        status: 404,
        message: `User with id ${userId} doesn't exist!`
      };
    }

    return user;
  } catch ({ status, message }) {
    throw {
      status,
      message: `Can't get a user because: ${message}`
    };
  }
};

const update = async (id, data) => {
  const user = await get(id);
  if (user === undefined) return null;
  return await updateUserDB(Object.assign({}, user, data));
};

const remove = async id => {
  const user = await get(id);
  if (user === undefined) return null;
  const isRemove = await removeUserDB(id);
  await unassignUser(id);
  return `[id: ${user.id}] ${isRemove}`;
};

module.exports = {
  getAll,
  save,
  get,
  update,
  remove
};
