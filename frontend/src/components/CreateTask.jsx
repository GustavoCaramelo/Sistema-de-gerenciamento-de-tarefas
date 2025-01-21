import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', formData)
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