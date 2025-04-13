import React from 'react';
import Nav from 'react-bootstrap/nav';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useModal } from './contexts/ModalContext';

const Header = () => {
  const { openModal } = useModal();
  const location = useLocation();

  return (
    <header className="bg-white p-3 px-5 sticky-top d-flex justify-content-between align-items-center">
      <Nav variant="pills" className="d-flex gap-4">
        <Nav.Item>
          <Link to="/issues" className={cn('nav-link', {'active': location.pathname.includes('issues')})}>
            Задачи
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/boards" className={cn('nav-link', {'active': location.pathname.includes('boards')})}>
            Проекты
          </Link>
        </Nav.Item>
      </Nav>
      <button className="btn btn-primary" onClick={() => openModal({ mode: 'create' })}>
        Создать задачу
      </button>
    </header>
  );
}

export default Header;
