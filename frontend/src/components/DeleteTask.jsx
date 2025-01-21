import React, { useState } from 'react';
import axios from 'axios';

const DeleteTask = () => {
  const [taskId, setTaskId] = useState('');

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
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