import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
});

async function getBoards() {
  const response = await instance.get('boards');
  return response.data.data;
}

export { getBoards };
