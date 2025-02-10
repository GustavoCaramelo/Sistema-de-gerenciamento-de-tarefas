import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loading

    if (!validatePassword(password)) {
      setError(
        "A senha deve ter no mínimo 6 caracteres, incluindo ao menos uma letra maiúscula, uma minúscula e um número."
      );
      setIsLoading(false); // Desativa o loading
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Tente novamente.");
      setIsLoading(false); // Desativa o loading
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });

      if (response.status === 200) {
        setMessage("Registro bem-sucedido! Faça login.");
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        throw new Error("Erro inesperado. Tente novamente.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao registrar.");
    } finally {
      setIsLoading(false); // Desativa o loading após finalizar
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
        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div style={{ position: "absolute", top: "100%", left: "0", backgroundColor: "#f0f0f0", padding: "5px", zIndex: 10 }}>
              A senha deve ter:
              <ul>
                <li>Mínimo de 6 caracteres</li>
                <li>Uma letra maiúscula</li>
                <li>Uma letra minúscula</li>
                <li>Um número</li>
              </ul>
            </div>
          )}
        </div>
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Registrar"}
        </button>
      </form>
      <button onClick={() => navigate("/login")}>Já tenho uma conta</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Register;
