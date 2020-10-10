const boards = [];

const getBoardsDB = () => [...boards];

const saveBoardToDB = board => {
  boards.push(board);
  return 'Board added!';
};

const updateBoardDB = board => {
  const boardIndex = boards.findIndex(({ id }) => id === board.id);
  boards.splice(boardIndex, 1, board);
  return 'Board updated!';
};

const removeBoardDB = boardId => {
  boards.splice(
    boards.findIndex(({ id }) => id === boardId),
    1
  );
  return 'Board deleted!';
};

module.exports = {
  getBoardsDB,
  saveBoardToDB,
  updateBoardDB,
  removeBoardDB
};
