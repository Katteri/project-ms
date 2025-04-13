import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header';
import Tasks from './Tasks';
import Boards from './Boards';
import ModalTask from './ModalTask';
import SingleBoard from './SingleBoard';
import { ModalProvider } from './contexts/ModalContext';

const App = () => {
  return (
    <ModalProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/issues" replace />} />
        <Route path="/issues" element={<Tasks />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/board/:id" element={<SingleBoard />} />
      </Routes>
      <ModalTask />
    </ModalProvider>
  );
}

export default App;
