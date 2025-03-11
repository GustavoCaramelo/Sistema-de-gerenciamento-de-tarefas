import React, { useState } from 'react';
import api from '../api';

const CreateTask = ({ onTasksUpdated }) => {
  const [formData, setFormData] = useState({ title: '', description: '', completed: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        '/tasks',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token do usuário
          },
        }
      );
      onTasksUpdated((prevTasks) => [...prevTasks, response.data]);
      setFormData({ title: '', description: '', completed: false });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Criar Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Criar
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
