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
    <div style={{ backgroundColor: '#5559', height: '906px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading} style={{ position: 'relative' }}>
          {isLoading ? (
            <div
              style={{
                width: '20px',
                height: '20px',
                border: '3px solid #ccc',
                borderTop: '3px solid #555',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
              }}
            />
          ) : (
            'Login'
          )}
        </button>
      </form>
      <span>Caso não tenha login, crie aqui</span>
      <button onClick={() => navigate('/register')} style={{ marginLeft: '5px', backgroundColor: '#5559' }}>
        Criar login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Adiciona a animação do spinner no estilo global */}
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
