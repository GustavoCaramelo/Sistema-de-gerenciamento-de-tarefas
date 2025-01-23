import React, { useState, useEffect } from "react";
import TaskManager from "../components/TaskManager";

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Busca o nome do usuário do localStorage
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName || "Usuário");
  }, []);

  const handleLogout = () => {
    // Remova o token e o nome do usuário do localStorage e redirecione para a tela de login
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
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