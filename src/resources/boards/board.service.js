const {
  getBoardsDB,
  saveBoardToDB,
  updateBoardDB,
  removeBoardDB
} = require('./board.memory.repository');
const Board = require('./board.model');

const getAllBoards = async () => await getBoardsDB();

const addBoard = async boardData => await saveBoardToDB(new Board(boardData));

const getBoard = async boardId => {
  const boards = await getAllBoards();
  return boards.find(({ id }) => id === boardId);
};

const updateBoard = async (boardId, boardData) => {
  const board = await getBoard(boardId);
  if (!board) return null;
  return await updateBoardDB(Object.assign({}, board, boardData));
};

const removeBoard = async id => {
  const board = await getBoard(id);
  if (!board) return null;
  return removeBoardDB(id);
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoard,
  updateBoard,
  removeBoard
};
