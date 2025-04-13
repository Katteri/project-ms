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

async function getTask(taskId) {
  const response = await instance.get(['tasks', taskId].join('/'));
  return response.data.data;
}

async function getUsers() {
  const response = await instance.get('users');
  return response.data.data;
}

async function createTask(task) {
  const response = await instance.post(['tasks', 'create'].join('/'), task);
  return response.data.data.id;
}

async function updateStatus(status, taskId) {
  await instance.put(['tasks', 'updateStatus', taskId].join('/'), { status });
}

async function updateTask(task, taskId) {
  await instance.put(['tasks', 'update', taskId].join('/'), task);
}

export {
  getBoards, getBoardTasks, getTasks, getTask, getUsers, createTask, updateStatus, updateTask,
};
