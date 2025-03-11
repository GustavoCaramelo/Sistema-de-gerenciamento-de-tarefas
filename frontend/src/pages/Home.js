import React, { useState, useEffect } from "react";
import TaskManager from "../components/TaskManager";
import api from "../api"; // Cliente configurado para autenticação

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Remove o token JWT e limpa os dados do usuário
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = null; // Remove o token do cabeçalho
    window.location.href = "/login"; // Redireciona para a página de login
  };

  return (
    <div className="p-6">
      <header>
        <div className="user-menu">
          <span onClick={() => setShowDropdown(!showDropdown)}>
            {userName ? userName : 'Usuario'}
          </span>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      <h1 className="text-2xl font-bold">Bem-vindo, {userName}!</h1>
      <TaskManager />
    </div>
  );
};

export default Home;
