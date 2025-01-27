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

// Adiciona o token JWT no cabeçalho de autorização
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
