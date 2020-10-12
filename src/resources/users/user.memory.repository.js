const db = [];

const getAllUsersDB = () => [...db];

const saveUserToDB = user => {
  db.push(user);
  return db.find(({ id }) => id === user.id);
};

const updateUserDB = user => {
  db.splice(
    db.findIndex(({ id }) => id === user.id),
    1,
    user
  );
  return db.find(({ id }) => id === user.id);
};

const removeUserDB = id => {
  db.splice(
    db.findIndex(user => user.id === id),
    1
  );
  return 'user deleted!';
};

module.exports = {
  getAllUsersDB,
  saveUserToDB,
  updateUserDB,
  removeUserDB
};
