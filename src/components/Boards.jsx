import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getBoards, getTasks } from '../axios';

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

const BoardTask = ({ task }) => {
  const colors = {
    'low': 'success',
    'medium': 'warning',
    'high': 'danger',
  }
  return (
    <Card className="my-4">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.description}</Card.Text>
        <Card.Text className="d-flex justify-content-between align-items-center">
          {task.assignee.fullName}
          <Badge bg={colors[task.priority.toLowerCase()]} className="mt-2 mb-1">{task.priority}</Badge>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

const SingleBoard = ({ board }) => {
  const [tasks, setTasks] = useState({
    backlog: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    const getData = async () => {
      let fetchedTasks = await getTasks();
      fetchedTasks = fetchedTasks.filter(task => task.boardId === board.id);

      setTasks({ 
        backlog: fetchedTasks.filter(task => task.status.toLowerCase() === 'backlog'),
        inProgress: fetchedTasks.filter(task => task.status.toLowerCase() === 'inprogress'),
        done: fetchedTasks.filter(task => task.status.toLowerCase() === 'done'),
      });
    };
    getData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="fs-2 py-4 pt-0">{board.name}</h1>
      <Row className="my-2">
        <Col className="border-bottom">
          <div className="py-2 px-3">To Do</div>
        </Col>
        <Col className="border-bottom">
          <div className="py-2 px-3">In Progress</div>
        </Col>
        <Col className="border-bottom">
          <div className="py-2 px-3">Done</div>          
        </Col>
      </Row>
      <Row>
        <Col>
          {tasks.backlog.map(task => <BoardTask key={task.id} task={task}/>)}
        </Col>
        <Col>
          {tasks.inProgress.map(task => <BoardTask key={task.id} task={task}/>)}
        </Col>
        <Col>
          {tasks.done.map(task => <BoardTask key={task.id} task={task}/>)}
        </Col>
      </Row>
    </div>
  );
}

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