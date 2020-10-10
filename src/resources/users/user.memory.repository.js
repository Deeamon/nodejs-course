const db = [];

const getAllUsersDB = () => [...db];

const saveUserToDB = user => {
  db.push(user);
  return 'user added!';
};

const updateUserDB = user => {
  db.splice(
    db.findIndex(({ id }) => id === user.id),
    1,
    user
  );
  return 'user updated!';
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
