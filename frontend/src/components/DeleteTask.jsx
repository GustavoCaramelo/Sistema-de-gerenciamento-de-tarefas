import React, { useState } from 'react';
import api from '../api'; // Substitui o axios pelo cliente `api`

const DeleteTask = () => {
  const [taskId, setTaskId] = useState('');

  const handleDelete = () => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        console.log('Tarefa excluída com sucesso');
        setTaskId('');
      })
      .catch((error) => console.error('Erro ao excluir tarefa:', error));
  };

  return (
    <div>
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
