import React, { useState, useEffect } from 'react';
import { getBoards } from '../axios';
import AllBoards from './AllBoards';
import SingleBoard from './SingleBoard';

const Boards = ({ currentBoard, setCurrentBoard }) => {
  const [boards, setBoards] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      const fetchedBoards = await getBoards();
      setBoards(fetchedBoards);
    };
    getData();
  }, []);

  const handlerBoardClick = (e) => {
    e.preventDefault();
    const boardId = parseInt(e.target.dataset.id, 10);
    const board = boards.filter((board) => board.id === boardId)[0];
    setCurrentBoard(board);
  }

  return (
    <>
      {currentBoard? <SingleBoard board={currentBoard} /> : <AllBoards boards={boards} handlerBoardClick={handlerBoardClick} />}
    </>
  );
}

export default Boards;