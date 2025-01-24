import React, { useState } from 'react';
import api from '../api'; // Substitui o axios pelo cliente `api`

const CreateTask = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/tasks', formData)
      .then((response) => {
        console.log('Tarefa criada:', response.data);
        setFormData({ title: '', description: '' });
      })
      .catch((error) => console.error('Erro ao criar tarefa:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Descrição"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Criar Tarefa</button>
    </form>
  );
};

export default CreateTask;
