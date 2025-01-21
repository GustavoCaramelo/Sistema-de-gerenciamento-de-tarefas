import React, { useState } from 'react';
import axios from 'axios';

const UpdateTask = () => {
  const [taskId, setTaskId] = useState('');
  const [formData, setFormData] = useState({ title: '', description: '', completed: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/tasks/${taskId}`, formData)
      .then((response) => console.log('Tarefa atualizada:', response.data))
      .catch((error) => console.error('Erro ao atualizar tarefa:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID da Tarefa"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
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
      <label>
        Concluído:
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={(e) => setFormData((prev) => ({ ...prev, completed: e.target.checked }))}
        />
      </label>
      <button type="submit">Atualizar Tarefa</button>
    </form>
  );
};

export default UpdateTask;