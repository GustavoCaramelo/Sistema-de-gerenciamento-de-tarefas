import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validações no front-end
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Tente novamente.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        confirmPassword, // Incluindo o campo confirmPassword no corpo da requisição
      });

      if (response.status === 201) { // Alterado para 201, pois o back-end retorna 201 ao registrar com sucesso
        setMessage("Registro bem-sucedido! Faça login.");
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error("Erro inesperado. Tente novamente.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao registrar.");
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha (mínimo 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      <button onClick={() => navigate("/login")}>Já tenho uma conta</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Register;
