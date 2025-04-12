import React from 'react';
import Nav from 'react-bootstrap/nav';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <header className="bg-white p-3 px-5 sticky-top d-flex justify-content-between align-items-center">
        <Nav variant="pills" defaultActiveKey={activeTab} className="d-flex gap-4">
          <Nav.Link eventKey="tasks" onClick={() => setActiveTab('tasks')}>Задачи</Nav.Link>
          <Nav.Link eventKey="boards" onClick={() => setActiveTab('boards')}>Проекты</Nav.Link>
        </Nav>
        <button className='btn btn-primary'>Создать задачу</button>
      </header>
    </>
  );
}

export default Header;
