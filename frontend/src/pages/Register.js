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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Registrar</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
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
          <input
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 rounded mb-2"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Carregando..." : "Registrar"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {message && <p className="text-green-500 mt-2">{message}</p>}
        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-blue-500 hover:underline"
        >
          Já tenho uma conta
        </button>
      </div>
    </div>
  );
};

export default Register;
