import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // Estado para erros
  const [isLoading, setIsLoading] = useState(false); // Estado para o ícone de loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loading

    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      localStorage.setItem('token', response.data.token); // Armazena o token
      localStorage.setItem('username', username); // Armazena o nome do usuário
      setError(''); // Limpa os erros anteriores
      navigate('/'); // Redireciona para a Home
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded mb-2"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Carregando..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          onClick={() => navigate("/register")}
          className="mt-4 text-blue-500 hover:underline"
        >
          Criar login
        </button>
      </div>
    </div>
  );
};

export default Login;
