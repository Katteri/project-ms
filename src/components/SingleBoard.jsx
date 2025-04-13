import React, { useState, useEffect } from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { getTasks } from '../axios';
import { useModal } from './contexts/ModalContext';

const BoardTask = ({ task }) => {
  const { openModal } = useModal();
  const colors = {
    'low': 'success',
    'medium': 'warning',
    'high': 'danger',
  };

  return (
    <Card
      className="my-4"
      onClick={() => openModal({ task, mode: 'editFromBoard' })}
      style={{ cursor: 'pointer' }}
    >
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

export default SingleBoard;
