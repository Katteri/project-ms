import React, { useState } from 'react';

const Header = () => {
  return (
    <header>
      <div>
        <p>Все задачи</p>
      </div>
      <div>
        <p>Проекты</p>
      </div>
      <button>
        Создать задачу
      </button>
    </header>
  );
}

export default Header;
