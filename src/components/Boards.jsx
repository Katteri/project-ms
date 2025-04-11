import React, { useState, useEffect } from 'react';
import { getBoards } from '../axios';

const Board = ({ board }) => {
  return (
    <React.Fragment key={board.id}>
      <div>
        <p>{board.name}</p>
        <a href='#'>Перейти к доске</a>
      </div>
    </React.Fragment>
  );
}

const Boards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedBoards = await getBoards();
      setBoards(fetchedBoards);
      console.log(fetchedBoards);
    };
    getData();
  }, []);

  return (
    <div>
      {boards.map((board) => <Board key={board.id} board={board}/>)}
    </div>
  );
}

export default Boards;