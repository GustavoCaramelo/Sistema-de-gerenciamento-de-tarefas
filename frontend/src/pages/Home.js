import React, { useState, useEffect } from "react";
import TaskManager from "../components/TaskManager";
import api from "../api"; // Cliente configurado para autenticação

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await api.get("/user/me");
        setUserName(response.data.name || "Usuário");
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
        setUserName("Usuário"); // Define um nome padrão caso falhe
      }
    };
  
    fetchUserName();
  }, []);

  const handleLogout = () => {
    // Remove o token JWT e limpa os dados do usuário
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = null; // Remove o token do cabeçalho
    window.location.href = "/login"; // Redireciona para a página de login
  };

  return (
    <div>
      <header>
        <div className="user-menu">
          <span onClick={() => setShowDropdown(!showDropdown)}>
            {userName}
          </span>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
      <main>
        <h1>Bem-vindo, {userName}!</h1>
        {/* Renderiza o gerenciador de tarefas */}
        <TaskManager />
      </main>
    </div>
  );
};

export default Home;
