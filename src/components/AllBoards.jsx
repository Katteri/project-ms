import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Board = ({ board, handlerBoardClick }) => {
  return (
    <>
      <ListGroup.Item className="d-flex justify-content-between align-items-center py-4">
        <div className='ms-2 me-auto'>
          {board.name}
        </div>
        <button className='btn btn-outline-primary' data-id={board.id} onClick={handlerBoardClick}>Перейти к доске</button>
      </ListGroup.Item>
    </>
  );
}

const AllBoards = ({ boards, handlerBoardClick }) => {
  return (
    <ListGroup className="p-4">
      {boards.map((board) => <Board key={board.id} board={board} handlerBoardClick={handlerBoardClick}/>)}
    </ListGroup>
  );
}

export default AllBoards;
