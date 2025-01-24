import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const registerUser = async (data) => {
  return api.post('/users/register', data);
};

export const loginUser = async (data) => {
  return api.post('/users/login', data);
};

export const getUserProfile = async (token) => {
  return api.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;
