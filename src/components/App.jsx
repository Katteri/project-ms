import React, { useState } from 'react';

import Header from './Header';
import Tasks from './Tasks';
import Boards from './Boards';
import ModalTask from './ModalTask';
import { ModalProvider } from './contexts/ModalContext';

const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentBoard, setCurrentBoard] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentBoard(null);
  }

  const content = activeTab === 'tasks'
    ? <Tasks />
    : <Boards currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}/>;

  return (
    <ModalProvider>
      <Header activeTab={activeTab} handleTabClick={handleTabClick}/>
      {content}
      <ModalTask />
    </ModalProvider>
  );
}

export default App;
