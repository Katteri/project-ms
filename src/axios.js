import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
});

async function getBoards() {
  const response = await instance.get('boards');
  return response.data.data;
}

async function getBoardTasks(boardId) {
  const response = await instance.get(['boards', boardId].join('/'));
  return response.data.data;
}

async function getTasks() {
  const response = await instance.get('tasks');
  return response.data.data;
}

export { getBoards, getBoardTasks, getTasks };
