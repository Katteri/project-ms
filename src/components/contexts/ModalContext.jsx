import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    task: null,
    show: false,
    mode: 'create', // 'edit', 'editFromTasks'
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  const openModal = ({ task = null, mode = 'create' }) => {
    setModal({ task, show: true, mode });
  };

  const handleExited = () => {
    setModal({ ...modal, task: null, show: false });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false});
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, handleExited, refreshTrigger, triggerRefresh }}>
      {children}
    </ModalContext.Provider>
  );
};
