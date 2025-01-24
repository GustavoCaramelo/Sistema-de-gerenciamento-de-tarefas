import React, { useState } from 'react';
import api from '../api'; // Substitui o axios pelo cliente `api`

const DeleteTask = ({ onTasksUpdated }) => {
  const [taskId, setTaskId] = useState('');

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${taskId}`);
      console.log('Tarefa excluída com sucesso');
      const response = await api.get('/tasks'); // Obtém a lista atualizada de tarefas
      onTasksUpdated(response.data); // Atualiza o estado no componente pai
      setTaskId(''); // Limpa o campo de entrada
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  return (
    <div>
      <h2>Excluir Tarefa</h2>
      <input
        type="text"
        placeholder="ID da Tarefa"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button onClick={handleDelete}>Excluir Tarefa</button>
    </div>
  );
};

export default DeleteTask;
