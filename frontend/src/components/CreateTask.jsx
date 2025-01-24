import React, { useState } from 'react';
import api from '../api';

const CreateTask = ({ onTasksUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async () => {
    try {
      await api.post('/tasks', { title, description });
      const response = await api.get('/tasks'); // Busca novamente todas as tarefas
      onTasksUpdated(response.data); // Atualiza a lista
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <div>
      <h2>Criar Tarefa</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <button onClick={handleCreate}>Criar</button>
    </div>
  );
};

export default CreateTask;
