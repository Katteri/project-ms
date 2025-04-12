import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { getTasks } from '../axios'

const Task = ({ task }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-start p-4">
      <div className="ms-2 me-auto">
        <div className="fw-bold">{task.title}</div>
          Исполнитель: {task.assignee.fullName}
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
  }, []);

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
      <Row className="px-5 my-2">
        <Col>
          <FloatingLabel controlId="floatingInputGrid" label="Поиск">
            <Form.Control placeholder="Поиск" value={searchInput} onChange={handleInputChange} autoComplete="off"/>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingSelectGrid" label="Статус">
            <Form.Select onChange={handleStatusChange}>
              <option value='all'>Все задачи</option>
              {filterParams.statuses.map((status) => <option value={status} key={`status-${status}`}>{status}</option>)}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingSelectGrid" label="Доска">
            <Form.Select onChange={handleBoardChange}>
              <option value='all'>Все задачи</option>
              {filterParams.boards.map((board) => <option value={board} key={`board-${board}`}>{board}</option>)}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <ListGroup className="p-4" style={{  "overflowX": "hidden" }}>
        {filteredTasks.map((task) => <Task task={task} key={task.id}/>)}
        <Row className="px-3 my-2 d-flex justify-content-center">
          <button className='btn btn-primary p-2 w-25'>Создать задачу</button>
        </Row>
      </ListGroup>
    </div>
  );
}

export default Tasks;
