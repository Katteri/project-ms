import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards } from '../axios';
import AllBoards from './AllBoards';

const Boards = () => {
  const navigate = useNavigate();
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
    navigate(`/board/${boardId}`);
  }

  return (
    <AllBoards boards={boards} handlerBoardClick={handlerBoardClick} />
  );
}

export default Boards;