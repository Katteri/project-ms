import React, { useState } from 'react';

import Header from './Header';
import Tasks from './Tasks';
import Boards from './Boards';

const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [currentBoard, setCurrentBoard] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentBoard(null);
  }

  const content = activeTab === 'tasks'? <Tasks/> : <Boards currentBoard={currentBoard} setCurrentBoard={setCurrentBoard}/>;
  return (
    <>
      <Header activeTab={activeTab} handleTabClick={handleTabClick}/>
      {content}
    </>
  );
}

export default App;
