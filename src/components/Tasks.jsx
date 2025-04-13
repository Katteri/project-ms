import React, { useState, useEffect } from "react";
import { Form, FloatingLabel, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { getTasks } from '../axios'
import { useModal } from './contexts/ModalContext';

const Task = ({ task }) => {
  const { openModal } = useModal();
  const colors = {
    'low': 'success',
    'medium': 'warning',
    'high': 'danger',
  };

  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-start p-4 ps-3"
      onClick={() => openModal({ task, mode: 'editFromTasks' })}
      style={{ cursor: 'pointer' }}
    >
      <div className="ms-2 me-auto w-100">
        <div className="fw-bold d-flex justify-content-between align-items-center">
          {task.title}
          <div className="fw-normal small me-2">{task.status}</div>
        </div>
        <div className="py-2">Проект: {task.boardName}</div>
        <div className="d-flex justify-content-between align-items-center">
          Исполнитель: {task.assignee.fullName}
          <Badge bg={colors[task.priority.toLowerCase()]} className="mt-2 mb-1">{task.priority}</Badge>
        </div>
      </div>
    </ListGroup.Item>
  );
}

const Tasks = () => {
  const [originalTasks, setOriginalTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterParams, setFilterParams] = useState({ statuses: [], boards: [] });
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBoard, setFilterBoard] = useState('all');
  const { openModal, refreshTrigger } = useModal();

  useEffect(() => {
    const getData = async () => {
      const fetchedTasks = await getTasks();
      setOriginalTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
      const statuses = [...new Set(fetchedTasks.map(task => task.status))]; 
      const boards = [...new Set(fetchedTasks.map(task => task.boardName))];
      setFilterParams({ statuses, boards });
    };
    getData();
  }, [refreshTrigger]);

  useEffect(() => {
    let result = [...originalTasks];

    if (searchInput != '') {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        (task.assignee && task.assignee.fullName.toLowerCase().includes(searchInput.toLowerCase()))
      );
    }

    if (filterStatus && filterStatus != 'all') {
      result = result.filter(task => task.status === filterStatus);
    }

    if (filterBoard && filterBoard != 'all') {
      result = result.filter(task => task.boardName === filterBoard);
    }
    
    setFilteredTasks(result);
  }, [searchInput, filterStatus, filterBoard, originalTasks]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  }

  const handleBoardChange = (e) => {
    setFilterBoard(e.target.value);
  }

  return (
    <div>
      <Row className="ps-5 pe-4 my-2 w-100">
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Поиск">
            <Form.Control placeholder="Поиск" value={searchInput} onChange={handleInputChange} autoComplete="off"/>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingSelectGrid" label="Статус">
            <Form.Select onChange={handleStatusChange}>
              <option value='all'>Все статусы</option>
              {filterParams.statuses.map((status) => <option value={status} key={`status-${status}`}>{status}</option>)}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingSelectGrid" label="Проект">
            <Form.Select onChange={handleBoardChange}>
              <option value='all'>Все проекты</option>
              {filterParams.boards.map((board) => <option value={board} key={`board-${board}`}>{board}</option>)}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <ListGroup className="p-4 w-100" style={{  "overflowX": "hidden" }}>
        {filteredTasks.map((task) => <Task task={task} key={task.id}/>)}
        <Row className="px-3 my-2 d-flex justify-content-center">
          <button
            className='btn btn-primary p-2 w-25'
            onClick={() => openModal({ mode: 'create' })}
          >
            Создать задачу
          </button>
        </Row>
      </ListGroup>
    </div>
  );
}

export default Tasks;
