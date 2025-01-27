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
    <div>
      <h2>Criar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateTask;
