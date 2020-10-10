const {
  getAllUsersDB,
  saveUserToDB,
  updateUserDB,
  removeUserDB
} = require('./user.memory.repository');

const User = require('./user.model');

const getAll = async () => {
  const users = await getAllUsersDB();
  return users.map(User.removePass);
};

const save = async userData => {
  const newUser = await saveUserToDB(new User(userData));
  return User.removePass(newUser);
};

const get = async id => {
  const users = await getAll();
  return users.find(user => user.id === id);
};

const update = async (id, data) => {
  const user = await get(id);
  if (user === undefined) return null;
  return await updateUserDB(Object.assign({}, user, data));
};

const remove = async id => {
  const user = await get(id);
  if (user === undefined) return null;

  await removeUserDB(id);
  return user;
};

module.exports = {
  getAll,
  save,
  get,
  update,
  remove
};
