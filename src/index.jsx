import ReactDOM from 'react-dom/client';
import React from 'react';

import './styles.scss';
import 'bootstrap';

import App from './components/App';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<App />);