import React, { useState } from 'react';

import Header from './Header';
import Tasks from './Tasks';
import Boards from './Boards';

const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const content = activeTab === 'tasks'? <Tasks/> : <Boards/>;
  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
      {content}
    </>
  );
}

export default App;
